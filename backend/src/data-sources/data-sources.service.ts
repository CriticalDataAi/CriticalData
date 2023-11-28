import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from './data-source.entity';

@Injectable()
export class DataSourcesService {
  constructor(
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
  ) {}

  async findAll(): Promise<DataSource[]> {
    return this.dataSourceRepository.find();
  }

  async findOne(id: number): Promise<DataSource> {
    return this.dataSourceRepository.findOne({ where: { id } });
  }

  async create(dataSource: Partial<DataSource>): Promise<DataSource> {
    const newuser = this.dataSourceRepository.create(dataSource);
    return this.dataSourceRepository.save(newuser);
  }

  async update(
    id: number,
    dataSource: Partial<DataSource>,
  ): Promise<DataSource> {
    await this.dataSourceRepository.update(id, dataSource);
    return this.dataSourceRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.dataSourceRepository.delete(id);
  }
}
