import { Injectable } from '@nestjs/common';
import { ConfigFactory } from '@nestjs/config';

@Injectable()
export class MediaConfig {
  public readonly mediaPath: string = 'public/media';
}
