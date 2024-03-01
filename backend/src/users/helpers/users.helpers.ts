import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@/users/user.entity';

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

  async findUserByUsername(
    username: string,
    userRepository: Repository<User>,
  ): Promise<User> {
    const foundUser = await userRepository.findOneBy({ username });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
