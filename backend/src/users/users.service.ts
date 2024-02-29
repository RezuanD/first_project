import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto, CreatedUser } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  saltOrRounds: number = 10;

  async create(user: CreateUserDto): Promise<CreatedUser> {
    if (
      (await this.userRepository.existsBy({ username: user.username })) ||
      (await this.userRepository.existsBy({ email: user.email }))
    ) {
      throw new ConflictException('User with username or email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, this.saltOrRounds);
    const createdUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
    const { password, avatar, ...restUser } = createdUser;
    return restUser;
  }

  async getUserById(userId: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id: userId });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
