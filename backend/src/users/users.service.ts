import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import { CreateUserDto, CreatedUser, UpdateUserDto } from './dto/user.dto';
import { UsersHelper } from './helpers/users.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UsersHelper,
    private readonly configService: ConfigService,
  ) {}

  private saltOrRounds: number =
    +this.configService.getOrThrow('SALT_OR_ROUNDS');

  async createUser({
    username,
    email,
    ...restUserData
  }: CreateUserDto): Promise<CreatedUser> {
    const foundUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (foundUser !== null) {
      throw new ConflictException('User with username or email already exists');
    }

    const hashedPassword = await this.usersHelper.hashPassword(
      restUserData.password,
      this.saltOrRounds,
    );

    const createdUser = await this.userRepository.save({
      username,
      email,
      ...restUserData,
      password: hashedPassword,
    });

    const { password, avatar, ...restUser } = createdUser;

    return restUser;
  }

  async findUser(userId: string): Promise<User> {
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
      userUpdateDto.password = await this.usersHelper.hashPassword(
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
