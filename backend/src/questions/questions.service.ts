import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingStatement } from 'src/training_statements/training_statement.entity';
import { Parameter } from 'src/parameters/parameter.entity';
import { DataSource } from 'src/data-sources/data-source.entity';
import OpenAI from 'openai';

import { DBMetadataExtractor } from 'src/common/utils/db-metadata-extractor';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(TrainingStatement)
    private trainingStatementRepository: Repository<TrainingStatement>,
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {}

  async askQuestion(question) {
    const trainingStatements = await this.trainingStatementRepository.find();
    const parameter = await this.parameterRepository.findOne({
      where: { type: 'chatgpt_key' },
    });
    const dataSource = await this.dataSourceRepository.find({ take: 1 });

    return await this.chatGptCall(
      parameter.value,
      trainingStatements,
      question,
      dataSource[0],
    );
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

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return response.choices[0].message.content;
    // return metadata;
  }

  preparePrompt(fewshot, question, sqlTables) {
    //Current strategy adapted from https://www.kdnuggets.com/leveraging-gpt-models-to-transform-natural-language-to-sql-queries
    const prompt = `
Given the following SQL tables, your job is to provide the required SQL tables
to fulfill any user request.

Tables: ${sqlTables}. Follow those examples the generate the answer, paying attention to both
the way of structuring queries and its format:
${fewshot}

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
}
