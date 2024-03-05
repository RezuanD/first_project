import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '@/auth/auth.service';
import { jwtConstants } from '@/auth/constants';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { AuthController } from '@/auth/auth.controller';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { AuthHelpers } from '@/auth/auth.helper';
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
      secret: jwtConstants.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: jwtConstants.EXPIRATION_1_HOUR_CONSTANT },
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
