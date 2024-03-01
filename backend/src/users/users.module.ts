import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/users.service';
import { UserController } from '@/users/user.contoller';
import { User } from '@/users/user.entity';
import { UsersHelper } from './helpers/users.helpers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, UsersHelper],
})
export class UserModule {}
