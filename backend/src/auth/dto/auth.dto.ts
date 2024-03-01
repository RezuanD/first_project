import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { User } from '@/users/user.entity';

export class CreateUserDto extends PickType(User, ['username']) {
  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
