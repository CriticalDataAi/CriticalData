import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions-slack')
export class QuestionsSlackController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async slackAskQuestion(@Body('text') question, @Body() payload) {
    this.questionsService.slackAskQuestion(question, payload['user_name'], payload['response_url']);

    return ""
  }
}
