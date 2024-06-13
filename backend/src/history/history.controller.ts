import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { AuthGuard } from '../auth/auth.guard';
import { History } from './entities/history.entity'

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async findAll(): Promise<History[]> {
    return await this.historyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<History> {
    const history = await this.historyService.findOne(+id);
    if (!history) {
      throw new NotFoundException('History does not exist!');
    } else {
      return history;
    }
  }

}
