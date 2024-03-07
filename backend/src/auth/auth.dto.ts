import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { User } from '@/users/user.entity';

export class LoginDto extends PickType(User, ['username']) {
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  access_token: string;
}
