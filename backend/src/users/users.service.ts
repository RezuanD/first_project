import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import { CreateUserDto, CreatedUser, UpdateUserDto } from '@/users/dto/user.dto';
import { UserHelpers } from '@/users/helpers/users.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UserHelpers,
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

    if (!foundUser) {
      throw new ConflictException('User with username or email already exists');
    }

    const hashedPassword = await this.usersHelper.hashPassword(
      restUserData.password,
      this.saltOrRounds,
    );

    const createdUser = await this.userRepository.save({
      username,
      email,
      password: hashedPassword,
      ...restUserData,
    });

    const { password, avatar, ...restUser } = createdUser;

    return restUser;
  }

  async findUser(userId: string): Promise<User> {
    const foundUser = await this.usersHelper.getUserById(
      userId,
    );

    return foundUser;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const foundUser = await this.usersHelper.getUserById(
      userId,
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
    );

    for (const fieldName of Object.keys(userUpdateDto)) {
      foundUser[fieldName] = userUpdateDto[fieldName];
    }

    return foundUser.save();
  }
}
