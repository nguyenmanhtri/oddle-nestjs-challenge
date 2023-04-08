import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDTO } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<Users | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createOne(createUserDTO);
  }
}
