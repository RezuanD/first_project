import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokensType } from '@/auth/types';
import { AuthHelpers } from '@/auth/auth.helper';
import { User } from '@/users/user.entity';
import { UserHelpers } from '@/users/helpers/users.helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userHelpers: UserHelpers,
    private readonly authHelpers: AuthHelpers,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const foundUser = await this.userHelpers.findUserByUsername(
      username,
      this.userRepository,
    );

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

  async login(user: User): Promise<TokensType> {
    const payload = { username: user.username, sub: user.id };

    return this.authHelpers.generateTokens(payload);
  }

  async refreshToken(user: User): Promise<TokensType> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return this.authHelpers.generateTokens(payload);
  }
}
