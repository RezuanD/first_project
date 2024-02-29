import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.entity';
import {
  IsDate,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto extends PickType(User, ['username', 'email']) {
  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;
}

export class CreatedUser extends PickType(User, [
  'username',
  'email',
  'createdAt',
  'updatedAt',
  'id',
]) {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
