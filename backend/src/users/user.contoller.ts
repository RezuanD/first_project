import { Body, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateUserDto, CreatedUser } from './dto/user.dto';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedUser })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreatedUser> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: CreatedUser })
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return this.usersService.getUserById(userId);
  }
}
