import { Injectable, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtAuthGuard_ extends AuthGuard('jwt') {}

export const JwtAuthGuard = () => applyDecorators(UseGuards(JwtAuthGuard_));
