import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingStatement } from 'src/training_statements/training_statement.entity';
import { Parameter } from 'src/parameters/parameter.entity';
import OpenAI from 'openai';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(TrainingStatement)
    private trainingStatementRepository: Repository<TrainingStatement>,
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
  ) {}

  async askQuestion(question) {
    const trainingStatements = await this.trainingStatementRepository.find();
    const parameter = await this.parameterRepository.findOne({
      where: { type: 'chatgpt_key' },
    });

    return await this.chatGptCall(
      parameter.value,
      trainingStatements,
      question,
    );
  }

  async chatGptCall(chatGptKey, statements, question) {
    const openai = new OpenAI({
      apiKey: chatGptKey,
    });

    const fewShot = this.parseFewShots(statements);
    const prompt = this.preparePrompt(fewShot, question);

    // const response = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    //   model: 'gpt-3.5-turbo',
    // });
    // return response.choices[0].message.content;
    return fewShot;
  }

  preparePrompt(fewshot, question) {
    //Current strategy adapted from https://www.kdnuggets.com/leveraging-gpt-models-to-transform-natural-language-to-sql-queries
    //hardcoded until metadata extracted from database
    const sqlTables = `
        CREATE TABLE PRODUCTS (
            product_name VARCHAR(100),
            price DECIMAL(10, 2),
            discount DECIMAL(5, 2),
            product_type VARCHAR(50),
            rating DECIMAL(3, 1),
            product_id VARCHAR(100)
        );

        CREATE TABLE ORDERS (
            order_number INT PRIMARY KEY,
            order_creation DATE,
            order_status VARCHAR(50),
            product_id VARCHAR(100)
        );
    `;

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
