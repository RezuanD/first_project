import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import { UsersHelper } from '@/users/helpers/users.helpers';
import { TokensType } from './types';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UsersHelper,
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const foundUser = await this.usersHelper.findUserByUsername(
      username,
      this.userRepository,
    );

    if (!(await this.usersHelper.validatePassword(pass, foundUser.password))) {
      return null;
    }

    const { password, ...result } = foundUser;
    return result;
  }

  async login(user: User): Promise<TokensType> {
    const payload = { username: user.username, sub: user.id };

    return this.authHelper.generateTokens(payload);
  }

  async refreshToken(user: User): Promise<TokensType> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return this.authHelper.generateTokens(payload);
  }
}
