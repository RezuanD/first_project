import { Injectable } from '@nestjs/common';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { AvatarHelpers } from '@/users/helpers/avatar.helper';

@Injectable()
export class AvatarService {
  constructor(
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

    await this.userHelpers.updateAvatarPath(username, path);

    await this.avatarHelpers.saveFile(path, file.buffer);

    return path;
  }
}
