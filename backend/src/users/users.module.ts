import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/user.contoller';
import { User } from '@/users/user.entity';
import { UsersHelper } from './helpers/users.helpers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper],
})
export class UsersModule {}
