import {
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserPayload } from '@/auth/decorators';
import {
  CreateUserDto,
  CreatedUser,
  UpdateUserDto,
  RetriveUser,
} from '@/users/dto/user.dto';
import { UserService } from '@/users/services/users.service';
import { AvatarUploadDto } from '@/users/dto/avatar.dto';
import { AvatarService } from '@/users/services/avatar.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly avatarServices: AvatarService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedUser })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreatedUser> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: RetriveUser })
  async findUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return this.usersService.findUser(userId);
  }

  @Delete()
  @ApiOkResponse({ status: 204, description: 'User successfully deleted' })
  @JwtAuthGuard()
  async deleteUser(@Request() req) {
    if (await this.usersService.deleteUser(req.userId)) {
      return { message: 'User deleted successfully' };
    }
  }

  @Put()
  @ApiOkResponse({ type: CreatedUser })
  @JwtAuthGuard()
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.userId, updateUserDto);
  }

  @Put('/avatar')
  @ApiOkResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Set avatar for user',
    type: AvatarUploadDto,
  })
  @JwtAuthGuard()
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @UserPayload() user: User,
  ): Promise<{ imagePath: string }> {
    const imagePath = await this.avatarServices.saveAvatar(user.username, file);

    return {
      imagePath: imagePath,
    };
  }
}
