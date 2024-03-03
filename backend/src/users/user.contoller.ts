import {
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Request } from '@nestjs/common';
import {
  CreateUserDto,
  CreatedUser,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { UserService } from '@/users/users.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

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

  @Delete()
  @ApiOkResponse({ status: 204, description: 'User successfully deleted' })
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Request() req) {
    if (await this.usersService.deleteUser(req.userId)) {
      return { message: 'User deleted successfully' };
    }
  }

  @Put()
  @ApiOkResponse({ type: CreatedUser })
  @UseGuards(JwtAuthGuard)
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.userId, updateUserDto);
  }
}
