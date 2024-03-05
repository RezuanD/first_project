import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserHelpers {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });

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

  async findUserByUsername(username: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ username });

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

  async updateAvatarPath(username: string, filePath: string) {
    const foundUser = await this.findUserByUsername(username);

    foundUser['avatar'] = filePath;

    await foundUser.save();
  }
}
