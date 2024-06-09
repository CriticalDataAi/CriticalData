import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptAdapter } from 'src/infra/bcrypt/bcrypt-adapter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async findAll(user: any): Promise<User[]> {
    const reqUser = await this.userRepository.findOne({
      where: { id: user.user_id },
    });

    if (!reqUser) throw new ForbiddenException();

    const findUser = await this.userRepository.find();

    if (!findUser) throw new ForbiddenException();

    return findUser;
  }

  async findOne(id: number, user: any): Promise<User> {
    const reqUser = await this.userRepository.findOne({
      where: { id: user.user_id },
    });

    if (!reqUser) throw new ForbiddenException();

    const findUser = await this.userRepository.findOne({
      where: { id },
    });

    return findUser;
  }

  async create(data: Partial<User>, user: any): Promise<User> {
    const reqUser = await this.userRepository.findOne({
      where: { id: user.user_id },
    });

    if (!reqUser) throw new ForbiddenException();

    data.password = await this.bcryptAdapter.hash(data.password);
    const newrow = this.userRepository.create(data);
    return this.userRepository.save(newrow);
  }

  async update(
    id: number,
    payloadUser: Partial<User>,
    user: any,
  ): Promise<User> {
    const reqUser = await this.userRepository.findOne({
      where: { id: user.user_id },
    });

    if (!reqUser) throw new ForbiddenException();

    const updateUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updateUser) throw new ForbiddenException();

    await this.userRepository.update(id, payloadUser);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number, user: any): Promise<void> {
    const reqUser = await this.userRepository.findOne({
      where: { id: user.user_id },
    });

    if (!reqUser) throw new ForbiddenException();

    const deleteUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!deleteUser) throw new ForbiddenException();

    // await this.userRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}