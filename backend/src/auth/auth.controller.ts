import { Response } from 'express';
import { Controller, Body, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from '@/auth/guards/refresh-jwt-auth.guard';
import { AccessTokenDto, LoginDto } from '@/auth/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserLocal, UserPayload } from '@/auth/decorators';
import { MessageDto } from '@/common/dto/message.dto';
import { Config } from '@/config/config';
import { RequestUserPayload } from '@/users/types';
import { User } from '@/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: AccessTokenDto,
  })
  @Post('login')
  @LocalAuthGuard()
  async login(
    @UserLocal() user: User,
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto
  ) {
    const tokens = await this.authService.login(user);

    response.cookie(
      'refresh_token',
      tokens.refresh_token,
      Config.CookieOptions,
    );

    return { access_token: tokens.access_token };
  }

  @ApiOkResponse({
    type: AccessTokenDto,
  })
  @RefreshTokenGuard()
  @Post('refresh')
  async refreshToken(
    @UserPayload() user: RequestUserPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshToken(user);

    response.cookie(
      'refresh_token',
      tokens.refresh_token,
      Config.CookieOptions,
    );

    return { access_token: tokens.access_token };
  }

  @ApiCreatedResponse({
    description: 'Refresh token successfully deleted',
    type: MessageDto,
  })
  @JwtAuthGuard()
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');

    return { message: 'Refresh token successuly deleted' };
  }
}
