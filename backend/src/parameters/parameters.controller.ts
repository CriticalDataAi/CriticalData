import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { Parameter } from './parameter.entity';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Get()
  async findAll(): Promise<Parameter[]> {
    return this.parametersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Parameter> {
    const dataSource = await this.parametersService.findOne(id);
    if (!dataSource) {
      throw new NotFoundException('DataSource does not exist!');
    } else {
      return dataSource;
    }
  }

  @Put()
  async update(
    @Param('parameter') parameter: string,
    @Body() data: Parameter,
  ): Promise<any> {
    return this.parametersService.update(parameter, data);
  }
}
