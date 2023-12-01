import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { Parameter } from './parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
