import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './users.entity';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async createOne(object: CreateUserDTO): Promise<Users> {
    const newUser = this.usersRepository.create(object);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateOne(id: number, object: UpdateUserDTO) {
    await this.usersRepository.update(id, object);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }
}
