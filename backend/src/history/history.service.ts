import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity'

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async findAll(): Promise<History[]> {
    return this.historyRepository.find();
  }

  async findOne(id: number): Promise<History> {
    return this.historyRepository.findOne({ where: { id } });
  }

}
