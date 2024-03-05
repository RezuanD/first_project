import {
  Controller,
  Body,
  Post,
  Request,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from '@/auth/guards/refresh-jwt-auth.guard';
import { AccessTokenDto, LoginDto, RefreshTokenDto } from '@/auth/auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: AccessTokenDto,
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto
  ) {
    const tokens = await this.authService.login(req.user);
    response.cookie('refresh_token', tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  @ApiOkResponse({
    type: AccessTokenDto,
  })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refrshToken(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
    @Body() refresh_token: RefreshTokenDto,
  ) {
    const tokens = await this.authService.refreshToken(req.user);
    response.cookie('refresh_token', tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  @ApiOkResponse({
    status: 204,
    description: 'Refresh token successfully deleted',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');
    return { message: 'Refresh token successuly deleted' };
  }
}
