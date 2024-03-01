import {
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto, CreatedUser, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

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

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return await this.usersService.deleteUser(userId);
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
