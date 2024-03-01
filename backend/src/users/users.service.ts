import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto, CreatedUser, UpdateUserDto } from './dto/user.dto';
import { UsersHelper } from './helpers/users.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UsersHelper,
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
    const foundUser = await this.usersHelper.getUserById(
      userId,
      this.userRepository,
    );

    return foundUser;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const foundUser = await this.usersHelper.getUserById(
      userId,
      this.userRepository,
    );
    await foundUser.remove();
    return true;
  }

  async updateUser(userId: string, userUpdateDto: UpdateUserDto) {
    if (Object.keys(userUpdateDto).length < 1) {
      throw new UnprocessableEntityException(
        'At least one field must be presented',
      );
    }

    if (userUpdateDto.password) {
      userUpdateDto.password = await bcrypt.hash(
        userUpdateDto.password,
        this.saltOrRounds,
      );
    }

    const foundUser = await this.usersHelper.getUserById(
      userId,
      this.userRepository,
    );

    for (const fieldName of Object.keys(userUpdateDto)) {
      foundUser[fieldName] = userUpdateDto[fieldName];
    }

    return foundUser.save();
  }
}
