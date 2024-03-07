import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Config } from '@/config/config';

@Injectable()
export class AvatarHelpers {
  async generateFilePath(username: string, fileName: string): Promise<string> {
    return `${Config.Media.mediaPath}/avatars/${username}/${fileName}`;
  }

  async saveFile(path: string, buffer: Buffer) {
    const directoryPath = path.substring(0, path.lastIndexOf('/'));

    try {
      await fs.promises.mkdir(directoryPath, { recursive: true });
      await fs.promises.writeFile(path, buffer);
    } catch (error) {
      throw new Error('Failed to save file');
    }
  }
}
