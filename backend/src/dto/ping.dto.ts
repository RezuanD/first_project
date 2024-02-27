import { ApiProperty } from '@nestjs/swagger';

export class PingDto {
  @ApiProperty()
  message: string;
}
