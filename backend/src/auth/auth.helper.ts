import { Injectable } from '@nestjs/common';
import { PayloadType, TokensType } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: PayloadType): Promise<TokensType> {
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.EXPIRATION_15_DAYS_CONSTANT,
      }),
    };
  }
}
