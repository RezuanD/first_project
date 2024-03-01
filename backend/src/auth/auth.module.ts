import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UsersHelper } from '@/users/helpers/users.helpers';
import { UserService } from '@/users/users.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UsersHelper, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
