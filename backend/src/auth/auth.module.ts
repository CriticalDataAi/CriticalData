import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { BcryptAdapter } from 'src/infra/bcrypt/bcrypt-adapter';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      // signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    {
      provide: BcryptAdapter,
      useClass: BcryptAdapter,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}