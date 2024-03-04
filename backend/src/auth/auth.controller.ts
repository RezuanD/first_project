import {
  Controller,
  Body,
  Post,
  Request,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Response } from 'express';
import { RefreshTokenGuard } from './guards/refresh-jwt-auth.guard';
import { AccessTokenDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  async refrshToken(@Request() req, @Body() refresh_token: RefreshTokenDto) {
    return this.authService.refreshToken(req.user);
  }

  @ApiOkResponse({ status: 204, description: 'Refresh token successfully deleted' })
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('refresh_token');
    return { message: 'Refresh token successuly deleted' };
  }
}
