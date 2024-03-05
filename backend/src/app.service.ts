import { Injectable } from '@nestjs/common';
import { PingDto } from '@/dto/ping.dto';

@Injectable()
export class AppService {
  getPing(): PingDto {
    return {
      message: 'pong',
    };
  }
}
