import { Controller, Body, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from '@/auth/guards/refresh-jwt-auth.guard';
import { AccessTokenDto, LoginDto, RefreshTokenDto } from '@/auth/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserPayload } from '@/auth/decorators';
import { Config } from '@/config/config';
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
    @UserPayload() user: User,
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
    @UserPayload() user: User,
    @Res({ passthrough: true }) response: Response,
    @Body() refresh_token: RefreshTokenDto,
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
  })
  @JwtAuthGuard()
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');

    return { message: 'Refresh token successuly deleted' };
  }
}
