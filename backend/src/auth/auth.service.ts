import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'src/infra/bcrypt/bcrypt-adapter';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatching = await this.bcryptAdapter.compare(
      password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const payload = { user_id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      username: user.name,
      userrole: user.role,
    };
  }

  async register(data: Partial<User>): Promise<any> {
    const users = await this.userRepository.find();
    console.log(users);
    if(users.length > 0) {
      throw new UnauthorizedException();
    }

    data.password = await this.bcryptAdapter.hash(data.password);
    data.status = 'active';
    data.role = 'admin';
    const newrow = this.userRepository.create(data);
    return this.userRepository.save(newrow);
  }
}