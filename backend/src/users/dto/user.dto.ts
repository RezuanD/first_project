import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { User } from '@/users/user.entity';

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

  @ApiProperty({ type: 'string', format: 'binary' })
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

export class RetriveUser extends CreatedUser {
  @ApiProperty()
  @IsString()
  avatar: string;
}

export class UpdateUserDto {
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
