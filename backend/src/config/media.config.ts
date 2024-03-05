import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaConfig {
  public readonly mediaPath: string = 'public/media';
}
