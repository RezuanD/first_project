import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { MediaConfig } from 'src/config/media.config';

@Injectable()
export class AvatarsHelper {
  constructor(private readonly mediaConfig: MediaConfig) {}

  async generateFilePath(username: string, fileName: string): Promise<string> {
    return `${this.mediaConfig.mediaPath}/avatars/${username}/${fileName}`;
  }

  async saveFile(filePath: string, fileBuffer: Buffer) {
    const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));

    try {
      await fs.promises.mkdir(directoryPath, { recursive: true });
      await fs.promises.writeFile(filePath, fileBuffer);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to save file');
    }
  }
}
