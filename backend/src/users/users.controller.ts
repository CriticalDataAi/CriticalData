import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() request) {
    return this.usersService.create(createUserDto, request.user);
  }

  @Get()
  findAll(@Req() request) {
    return this.usersService.findAll(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    return this.usersService.findOne(+id, request.user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    return this.usersService.update(+id, updateUserDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.usersService.remove(+id, request.user);
  }
}