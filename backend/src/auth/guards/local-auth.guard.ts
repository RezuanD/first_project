import { Injectable, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class LocalAuthGuard_ extends AuthGuard('local') {}

export const LocalAuthGuard = () => applyDecorators(UseGuards(LocalAuthGuard_));
