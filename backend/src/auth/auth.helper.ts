import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '@/config/config';
import { PayloadType, TokensType } from '@/auth/types';

@Injectable()
export class AuthHelpers {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: PayloadType): Promise<TokensType> {
    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(payload),
      await this.jwtService.signAsync(payload, {
        expiresIn: Config.JWT.JWT_REFRESH_EXPIRATION,
      }),
    ]);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
