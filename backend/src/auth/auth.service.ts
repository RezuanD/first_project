import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/users/user.entity';
import { UsersHelper } from '@/users/helpers/users.helpers';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UsersHelper,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const foundUser = await this.usersHelper.findUserByUsername(
      username,
      this.userRepository,
    );

    if (!(await this.usersHelper.validatePassword(pass, foundUser.password))) {
      throw new UnauthorizedException();
    }

    const { password, ...restUser } = foundUser;

    return restUser;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
