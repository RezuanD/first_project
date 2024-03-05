import { Injectable } from '@nestjs/common';
import { PayloadType, TokensType } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthHelpers {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: PayloadType): Promise<TokensType> {
    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(payload),
      await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.JWT_REFRESH_EXPIRATION,
      }),
    ]);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
