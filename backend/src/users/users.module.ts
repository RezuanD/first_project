import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/services/users.service';
import { UserController } from '@/users/user.contoller';
import { ConfigModule } from '@nestjs/config';
import { User } from '@/users/user.entity';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { AvatarService } from '@/users/services/avatar.service';
import { AvatarHelpers } from '@/users/helpers/avatar.helper';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, UserHelpers, AvatarService, AvatarHelpers],
})
export class UserModule {}
