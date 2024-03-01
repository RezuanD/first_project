import {
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreatedUser,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { UsersService } from '@/users/users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedUser })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreatedUser> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: CreatedUser })
  async findUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return this.usersService.findUser(userId);
  }

  @Delete(':id')
  @ApiOkResponse({ status: 204, description: 'User successfully deleted' })
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return this.usersService.deleteUser(userId);
  }

  @Put(':id')
  @ApiOkResponse({ type: CreatedUser })
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
