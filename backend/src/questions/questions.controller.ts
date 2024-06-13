import { Controller, Get, Post, Query, Body, UseGuards, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('questions')
@UseGuards(AuthGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async askQuestion(@Query('question') question, @Req() request) {
    return this.questionsService.askQuestion(question, {name: request.user.email}, 'api');
  }

}
