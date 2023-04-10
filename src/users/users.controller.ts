import {
  Controller,
  Get, Post, Patch, Delete,
  Param, Body, Response,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

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
  async create(
    @Body() createUserDTO: CreateUserDTO,
    @Response() res,
  ) {
    const newUser = await this.usersService.createOne({
      ...createUserDTO,
      external_id: res.locals.stripeAccount ? res.locals.stripeAccount.id : null,
    });
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
    @Response() res,
  ) {
    const updatedUser = await this.usersService.updateOne(id, updateUserDTO);
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  delete(@Response() res) {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({ message: 'DELETE NOT ALLOWED.' })
  }
}
