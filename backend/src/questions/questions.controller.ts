import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async askQuestion(@Query('question') question) {
    console.log(question);
    return this.questionsService.askQuestion(question);
  }
}
