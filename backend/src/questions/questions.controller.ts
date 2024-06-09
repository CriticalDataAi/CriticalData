import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async askQuestion(@Query('question') question) {
    return this.questionsService.askQuestion(question);
  }

  @Post()
  async slackAskQuestion(@Body('text') question, @Body('user_name') questionUser) {
    return await this.questionsService.slackAskQuestion(question, questionUser);
  }
}
