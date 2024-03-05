import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { MediaConfig } from 'src/config/media.config';

@Injectable()
export class AvatarHelpers {
  constructor(private readonly mediaConfig: MediaConfig) {}

  async generateFilePath(username: string, fileName: string): Promise<string> {
    return `${this.mediaConfig.mediaPath}/avatars/${username}/${fileName}`;
  }

  async saveFile(path: string, buffer: Buffer) {
    const directoryPath = path.substring(0, path.lastIndexOf('/'));

    try {
      await fs.promises.mkdir(directoryPath, { recursive: true });
      await fs.promises.writeFile(path, buffer);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to save file');
    }
  }
}
