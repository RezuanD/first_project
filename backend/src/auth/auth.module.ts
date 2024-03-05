import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '@/auth/auth.service';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { AuthController } from '@/auth/auth.controller';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { AuthHelpers } from '@/auth/auth.helper';
import { Config } from '@/config/config';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { User } from '@/users/user.entity';
import { UserModule } from '@/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Config.JWT.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: Config.JWT.JWT_ACCESS_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserHelpers,
    AuthHelpers,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
