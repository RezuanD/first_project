import { Body, Post } from '@nestjs/common';
import { CreateUserDto, CreatedUser } from './dto/user.dto';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedUser })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreatedUser> {
    return await this.usersService.create(createUserDto);
  }
}
