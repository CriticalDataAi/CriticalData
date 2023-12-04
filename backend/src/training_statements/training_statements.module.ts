import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingStatementsController } from './training_statements.controller';
import { TrainingStatementsService } from './training_statements.service';
import { TrainingStatement } from './training_statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingStatement])],
  controllers: [TrainingStatementsController],
  providers: [TrainingStatementsService],
})
export class TrainingStatementsModule {}
