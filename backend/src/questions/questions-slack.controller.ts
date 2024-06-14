import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { SlackGuard } from '../auth/slack.guard';

@Controller('questions-slack')
@UseGuards(SlackGuard)
export class QuestionsSlackController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('question')
  async slackAskQuestion(@Body('text') question, @Body() payload) {
    this.questionsService.slackAskQuestion(question, payload['user_name'], payload['response_url']);

    return ""
  }

  @Post('actions')
  async questionAction(@Body('payload') payload) {
    console.log(payload);

    return ""
  }
}
