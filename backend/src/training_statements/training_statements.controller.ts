import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TrainingStatementsService } from './training_statements.service';
import { TrainingStatement } from './training_statement.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('training-statements')
@UseGuards(AuthGuard)
export class TrainingStatementsController {
  constructor(
    private readonly trainingStatementsService: TrainingStatementsService,
  ) {}

  @Get()
  async findAll(): Promise<TrainingStatement[]> {
    return this.trainingStatementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TrainingStatement> {
    const trainingStatement = await this.trainingStatementsService.findOne(id);
    if (!trainingStatement) {
      throw new NotFoundException('Training Statement does not exist!');
    } else {
      return trainingStatement;
    }
  }

  @Post()
  async create(
    @Body() trainingStatement: TrainingStatement,
  ): Promise<TrainingStatement> {
    return this.trainingStatementsService.create(trainingStatement);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() trainingStatement: TrainingStatement,
  ): Promise<any> {
    return this.trainingStatementsService.update(id, trainingStatement);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const trainingStatement = await this.trainingStatementsService.findOne(id);
    if (!trainingStatement) {
      throw new NotFoundException('Training Statement does not exist!');
    }
    return this.trainingStatementsService.delete(id);
  }
}
