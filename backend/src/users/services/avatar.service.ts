import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/user.entity';
import { UsersHelper } from '../helpers/users.helpers';
import { AvatarsHelper } from '../helpers/avatar.helper';
import { Repository } from 'typeorm';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHelper: UsersHelper,
    private readonly avatarHelper: AvatarsHelper,
  ) {}

  async saveAvatar(
    username: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const path = await this.avatarHelper.generateFilePath(
      username,
      file.originalname,
    );

    await this.usersHelper.updateAvatarPath(
      username,
      this.userRepository,
      path,
    );

    await this.avatarHelper.saveFile(path, file.buffer);

    return path;
  }
}
