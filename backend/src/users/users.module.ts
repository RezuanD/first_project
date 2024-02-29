import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './user.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersHelper } from './helpers/users.helpers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper],
})
export class UsersModule {}
