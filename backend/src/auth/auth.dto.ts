import { User } from '@/users/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto extends PickType(User, ['username']) {
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  @IsOptional()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  access_token: string;
}
