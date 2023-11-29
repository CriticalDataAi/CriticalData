import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { DataSource } from './data-source.entity';

@Controller('data-sources')
export class DataSourcesController {
  constructor(private readonly dataSourceService: DataSourcesService) {}

  @Get()
  async findAll(): Promise<DataSource[]> {
    return this.dataSourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DataSource> {
    const dataSource = await this.dataSourceService.findOne(id);
    if (!dataSource) {
      throw new NotFoundException('DataSource does not exist!');
    } else {
      return dataSource;
    }
  }

  @Post()
  async create(@Body() dataSource: DataSource): Promise<DataSource> {
    return this.dataSourceService.create(dataSource);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dataSource: DataSource,
  ): Promise<any> {
    return this.dataSourceService.update(id, dataSource);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const dataSource = await this.dataSourceService.findOne(id);
    if (!dataSource) {
      throw new NotFoundException('DataSource does not exist!');
    }
    return this.dataSourceService.delete(id);
  }
}
