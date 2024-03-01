import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UsersHelper } from '@/users/helpers/users.helpers';
<<<<<<< HEAD
import { User } from '@/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
=======
import { UserService } from '@/users/users.service';

@Module({
  imports: [
>>>>>>> ce5b1fabd9c0e468a69a6e756bdb9dc42dbcc4a1
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
<<<<<<< HEAD
  providers: [AuthService, LocalStrategy, UsersHelper],
=======
  providers: [AuthService, LocalStrategy, UsersHelper, UserService],
>>>>>>> ce5b1fabd9c0e468a69a6e756bdb9dc42dbcc4a1
  controllers: [AuthController],
})
export class AuthModule {}
