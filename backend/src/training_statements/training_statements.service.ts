import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingStatement } from './training_statement.entity';

@Injectable()
export class TrainingStatementsService {
  constructor(
    @InjectRepository(TrainingStatement)
    private trainingStatementRepository: Repository<TrainingStatement>,
  ) {}

  async findAll(): Promise<TrainingStatement[]> {
    return this.trainingStatementRepository.find();
  }

  async findOne(id: number): Promise<TrainingStatement> {
    return this.trainingStatementRepository.findOne({ where: { id } });
  }

  async create(
    trainingStatement: Partial<TrainingStatement>,
  ): Promise<TrainingStatement> {
    const newuser = this.trainingStatementRepository.create(trainingStatement);
    return this.trainingStatementRepository.save(newuser);
  }

  async update(
    id: number,
    trainingStatement: Partial<TrainingStatement>,
  ): Promise<TrainingStatement> {
    await this.trainingStatementRepository.update(id, trainingStatement);
    return this.trainingStatementRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.trainingStatementRepository.delete(id);
  }
}
