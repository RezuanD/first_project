import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import {
  CreateUserDto,
  CreatedUser,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { UserHelpers } from '@/users/helpers/users.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userHelpers: UserHelpers,
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

    const hashedPassword = await this.userHelpers.hashPassword(
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
    const foundUser = await this.userHelpers.getUserById(userId);
    return foundUser;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const foundUser = await this.userHelpers.getUserById(userId);

    await foundUser.remove();

    return true;
  }

  async updateUser(userId: string, userUpdateDto: UpdateUserDto) {
    if (!Object.keys(userUpdateDto).length) {
      throw new UnprocessableEntityException(
        'At least one field must be presented',
      );
    }

    if (userUpdateDto.password) {
      userUpdateDto.password = await this.userHelpers.hashPassword(
        userUpdateDto.password,
        this.saltOrRounds,
      );
    }

    const foundUser = await this.userHelpers.getUserById(userId);

    for (const fieldName of Object.keys(userUpdateDto)) {
      foundUser[fieldName] = userUpdateDto[fieldName];
    }

    return foundUser.save();
  }
}
