import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TrainingStatement } from 'src/training_statements/training_statement.entity';
import { Parameter } from 'src/parameters/parameter.entity';
import { DataSource } from 'src/data-sources/data-source.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingStatement, Parameter, DataSource]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
