import { Injectable } from '@nestjs/common';
import { TokensType } from '@/auth/types';
import { AuthHelpers } from '@/auth/auth.helper';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { RequestUserPayload } from '@/users/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userHelpers: UserHelpers,
    private readonly authHelpers: AuthHelpers,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const foundUser = await this.userHelpers.findUserByUsername(username);

    const isPasswordValid = await this.userHelpers.validatePassword(
      pass,
      foundUser.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    const { password, ...result } = foundUser;
    return result;
  }

  async login(user: RequestUserPayload): Promise<TokensType> {
    const payload = { username: user.username, sub: user.userId };

    return this.authHelpers.generateTokens(payload);
  }

  async refreshToken(user: RequestUserPayload): Promise<TokensType> {
    const payload = {
      username: user.username,
      sub: user.userId,
    };

    return this.authHelpers.generateTokens(payload);
  }
}
