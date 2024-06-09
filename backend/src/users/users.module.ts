import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptAdapter } from 'src/infra/bcrypt/bcrypt-adapter';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: BcryptAdapter,
      useClass: BcryptAdapter,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
