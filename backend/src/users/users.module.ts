import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/services/users.service';
import { UserController } from '@/users/user.contoller';
import { ConfigModule } from '@nestjs/config';
import { MediaConfig } from 'src/config/media.config';
import { User } from '@/users/user.entity';
import { UsersHelper } from '@/users/helpers/users.helpers';
import { AvatarsService } from '@/users/services/avatar.service';
import { AvatarsHelper } from '@/users/helpers/avatar.helper';

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
