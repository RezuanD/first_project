import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/services/users.service';
import { UserController } from '@/users/user.contoller';
import { User } from '@/users/user.entity';
import { UsersHelper } from './helpers/users.helpers';
import { ConfigModule } from '@nestjs/config';
import { AvatarsService } from './services/avatar.service';
import { AvatarsHelper } from './helpers/avatar.helper';
import { MediaConfig } from 'src/config/media.config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    UsersHelper,
    AvatarsService,
    AvatarsHelper,
    MediaConfig,
  ],
})
export class UserModule {}
