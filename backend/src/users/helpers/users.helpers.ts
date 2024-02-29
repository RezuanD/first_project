import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersHelper {
  async getUserById(
    userId: string,
    userRepository: Repository<User>,
  ): Promise<User> {
    const foundUser = await userRepository.findOneBy({ id: userId });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
}
