import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';

@Injectable()
export class UsersHelper {
  async getUserById(
    id: string,
    userRepository: Repository<User>,
  ): Promise<User> {
    const foundUser = await userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async hashPassword(
    password: string,
    saltOrRounds: string | number,
  ): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }
}
