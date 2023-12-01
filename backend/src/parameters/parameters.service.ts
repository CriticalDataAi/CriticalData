import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parameter } from './parameter.entity';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
  ) {}

  async findAll(): Promise<Parameter[]> {
    return this.parameterRepository.find();
  }

  async findOne(id: number): Promise<Parameter> {
    return this.parameterRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Parameter>): Promise<Parameter> {
    const newrow = this.parameterRepository.create(data);
    return this.parameterRepository.save(newrow);
  }

  async update(
    parameter: string,
    data: Partial<Parameter>,
  ): Promise<Parameter> {
    const param = await this.parameterRepository.findOne({
      where: { type: parameter },
    });
    if (param) {
      await this.parameterRepository.update(param.id, data);
      return this.parameterRepository.findOne({ where: { id: param.id } });
    } else {
      return this.create(data);
    }
  }

  async delete(id: number): Promise<void> {
    await this.parameterRepository.delete(id);
  }
}
