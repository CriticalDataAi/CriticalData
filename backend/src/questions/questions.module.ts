import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsSlackController } from './questions-slack.controller';
import { QuestionsService } from './questions.service';
import { TrainingStatement } from 'src/training_statements/training_statement.entity';
import { Parameter } from 'src/parameters/parameter.entity';
import { DataSource } from 'src/data-sources/data-source.entity';
import { History } from 'src/history/entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingStatement, Parameter, DataSource, History]),
  ],
  controllers: [QuestionsController, QuestionsSlackController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
