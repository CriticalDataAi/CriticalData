import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingStatement } from 'src/training_statements/training_statement.entity';
import { Parameter } from 'src/parameters/parameter.entity';
import { DataSource } from 'src/data-sources/data-source.entity';
import { History } from 'src/history/entities/history.entity';
import OpenAI from 'openai';

import { DBMetadataExtractor } from 'src/common/utils/db-metadata-extractor';
import { DBQueryRunner } from 'src/common/utils/db-query-runner';

import axios from 'axios';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(TrainingStatement)
    private trainingStatementRepository: Repository<TrainingStatement>,
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async askQuestion(question, user, questionSource) {
    if(question.length < 10 )
      return {error: true, data: "Pergunta inválida"};

    try {
      const trainingStatements = await this.trainingStatementRepository.find();
      const parameter = await this.parameterRepository.findOne({
        where: { type: 'chatgpt_key' },
      });
      const dataSource = await this.dataSourceRepository.find({ take: 1 });

      const queryStatement = await this.chatGptCall(
        parameter.value,
        trainingStatements,
        question,
        dataSource[0],
      );

      const dataRows = await this.executeStatement(queryStatement, dataSource[0]);

      if( dataRows.length == 0 )
        return {error: true, data: "Sem Dados!"};

      const history = await this.createQuestionHistory(questionSource, question, user.name, queryStatement);

      return {error: false, data: dataRows, execution_id: history.id};
    } catch (e) {
      await this.createErrorHistory(questionSource, question, user.name, e.message);

      return {error: true, data: e.message};
    }
  }

  async slackAskQuestion(question, slackUser, responseUrl) {
    if(slackUser != 'leandrobarreto') {
      return "Parece que você não tem acesso a esse recurso"
    }

    const data = await this.askQuestion(question, {name: slackUser},'slack');

    if(data['error'] === true){
      // console.log(this.slackErrorOutputFormat(question, data['data']));
      return await this.slackReturn(responseUrl, this.slackErrorOutputFormat(question, data['data']));
    }

    const formatted = this.slackOutputFormat(question, data['data'], data['execution_id']);

    try {
      await this.slackReturn(responseUrl, formatted);
    }
    catch (e) {
      return await this.slackReturn(responseUrl, this.slackErrorOutputFormat(question, "Houve algum erro, contate o administrador!"));
    }
  }

  async chatGptCall(chatGptKey, statements, question, dataSource) {
    const openai = new OpenAI({
      apiKey: chatGptKey,
    });

    const dbMetadataExtractor = new DBMetadataExtractor(
      dataSource.type,
      dataSource.url,
      dataSource.username,
      dataSource.password,
      Number(dataSource.port),
      dataSource.database,
      dataSource.schema,
      dataSource.tablesToScan,
    );

    const metadata = await dbMetadataExtractor.extractMetadata();

    const fewShot = this.parseFewShots(statements);
    const prompt = this.preparePrompt(fewShot, question, metadata);
    // console.log(prompt);

    // const response = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(response.choices[0].message.content)
    // return response.choices[0].message.content;
    // const query = response.choices[0].message.content;

    return "select deal_status, count(1) cnt, sum(valor_requisitado) valor_requisitado from fact_precatorios fp group by 1;";
    return `
      SELECT advogado, sum(valor_requisitado) as total_requisitado
      FROM dim_advogados a
      JOIN fact_precatorios p ON a.dim_advogado_id = p.fk_dim_advogado
      WHERE p.sistema = 'MUNICIPAL'
      GROUP BY advogado
      ORDER BY total_requisitado DESC;
    `;
  }

  preparePrompt(fewshot, question, sqlTables) {
    //Current strategy adapted from https://www.kdnuggets.com/leveraging-gpt-models-to-transform-natural-language-to-sql-queries
    const prompt = `
Given the following SQL tables, your job is to provide the required SQL statement
to fulfill any user request. The return should contain only a valid SQL statement.

Tables: ${sqlTables}
` + (fewshot == "" ? "" :  (`Follow those examples the generate the answer, paying attention to both
the way of structuring queries and its format:
${fewshot}`)) + `

User request: ${question}`;

    return prompt;
  }

  parseFewShots(statements) {
    let fewShot = ``;
    let exampleCounter = 1;

    statements.forEach((statement) => {
      fewShot += `-------------- Exemple ${exampleCounter}:
User: ${statement.context}
System: 
${statement.query}

`;
      exampleCounter = exampleCounter + 1;
    });

    return fewShot;
  }

  async executeStatement(queryStatement, dataSource) {
    const dbQueryRunner = new DBQueryRunner(
      dataSource.type,
      dataSource.url,
      dataSource.username,
      dataSource.password,
      Number(dataSource.port),
      queryStatement,
      dataSource.database,
      dataSource.schema,
    );

    return await dbQueryRunner.executeStatement();
  }

  slackOutputFormat(question, data, historyId) {
    if((data).length == 0)
      return "Sem dados para disponibilizar!"
    const keys = Object.keys(data[0]);

    const lineLength = 80;
    const colLength = Math.floor(lineLength / keys.length);

    let csv = "";
    let counter = 0;
    let returnObject : any = {};

    keys.forEach((row) => {
      if(String(row).length > colLength)
        csv += row.substring(0, colLength);
      else
        csv += String(row).padEnd(colLength, " ");
    })
    data.forEach((row) => {
      const tRow = []
      keys.forEach((col) => {
        if(String(row[col]).length > colLength)
          tRow.push(row[col].substring(0, colLength));
        else  
          tRow.push(String(row[col]).padEnd(colLength, " "));
      });

      counter += 1;
      if( counter <= 5 )
        csv += tRow.join("") + "\n";
    });

    returnObject = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": question,
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "rich_text",
          "elements": [
            {
              "type": "rich_text_preformatted",
              "elements": [
                {
                  "type": "text",
                  "text": csv
                }
              ]
            }
          ]
        }
    ]

    if( counter > 5 ) {
      returnObject = [
        ...returnObject,
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": "Mostrando apenas os primeiros 5 registros",
              "emoji": true
            }
          ]
        }
      ]
    }

    return returnObject;
  }

  slackErrorOutputFormat(question, text) {
    return [
      {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": question,
            "emoji": true
          }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "plain_text",
            "text": text,
            "emoji": true
          }
        ]
      }
    ]
  }

  bkp_slackErrorOutputFormat(question, text) {
    return [
      {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": question,
            "emoji": true
          }
          ,"accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Me parece errado!"
                },
                "value": "questionable_value"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Criar no Metabase"
                },
                "value": "create_metabase"
              }
            ],
            "action_id": "question-action"
          }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "plain_text",
            "text": text,
            "emoji": true
          }
        ]
      }
    ]
  }

  async createErrorHistory(questionSource,questionAsked,questionUsername, questionResponse) {
    const newRow = await this.historyRepository.create({
        questionSource,
        questionAsked,
        questionUsername,
        status: 'error',
        questionResponse,
      });
    return await this.historyRepository.save(newRow);
  }

  async createQuestionHistory(questionSource,questionAsked,questionUsername, questionResponse) {
    const newRow = await this.historyRepository.create({
        questionSource,
        questionAsked,
        questionUsername,
        status: 'success',
        questionResponse,
      });
    return await this.historyRepository.save(newRow);
  }

  async slackReturn(responseUrl, responseData) {
    const api = axios.create({
      baseURL: responseUrl,
    });

    const ret = await api.request({
      url: responseUrl,
      method: 'POST',
      data: {
        "blocks": responseData,
      }
    });
  }
}
