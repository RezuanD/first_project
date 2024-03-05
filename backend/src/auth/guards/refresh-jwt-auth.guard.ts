import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants';

@Injectable()
class RefreshTokenGuard_ extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.cookies.refresh_token;

      if (!token) {
        throw new UnauthorizedException();
      }

      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.JWT_ACCESS_SECRET,
      });

      req.user = { ...decoded, refresh_token: token };

      return true;
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

export const RefreshTokenGuard = () =>
  applyDecorators(UseGuards(RefreshTokenGuard_));
