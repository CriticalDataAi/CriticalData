import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { Parameter } from './parameter.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('parameters')
@UseGuards(AuthGuard)
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
