import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { AvatarHelpers } from '@/users/helpers/avatar.helper';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userHelpers: UserHelpers,
    private readonly avatarHelpers: AvatarHelpers,
  ) {}

  async saveAvatar(
    username: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const path = await this.avatarHelpers.generateFilePath(
      username,
      file.originalname,
    );

    await this.userHelpers.updateAvatarPath(
      username,
      this.userRepository,
      path,
    );

    await this.avatarHelpers.saveFile(path, file.buffer);

    return path;
  }
}
