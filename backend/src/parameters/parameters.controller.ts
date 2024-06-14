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

  @Get(':parameter')
  async findOne(@Param('parameter') type: string): Promise<Parameter> {
    const parameter = await this.parametersService.findOneByType(type);
    if (!parameter) {
      throw new NotFoundException('Parameter does not exist!');
    } else {
      return parameter;
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
