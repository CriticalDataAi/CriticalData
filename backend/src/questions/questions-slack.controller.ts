import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions-slack')
export class QuestionsSlackController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async slackAskQuestion(@Body('text') question, @Body('user_name') questionUser) {
    return await this.questionsService.slackAskQuestion(question, questionUser);
  }
}
