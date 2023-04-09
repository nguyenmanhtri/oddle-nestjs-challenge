import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.register({ folder: './config' }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
