import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/user.contoller';
import { User } from '@/users/user.entity';
import { UsersHelper } from './helpers/users.helpers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper],
})
export class UsersModule {}
