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
import { RequestUserPayload } from '@/users/types';
import { MessageDto } from '@/common/dto/message.dto';

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
  @ApiOkResponse({ status: 204, type: MessageDto })
  @JwtAuthGuard()
  async deleteUser(@UserPayload() user: RequestUserPayload) {
    if (await this.usersService.deleteUser(user.userId)) {
      return { message: 'User deleted successfully' };
    }
  }

  @Put()
  @ApiOkResponse({ type: CreatedUser })
  @JwtAuthGuard()
  async updateUser(
    @UserPayload() userPayload: RequestUserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userPayload.userId, updateUserDto);
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
    @UserPayload() user: RequestUserPayload,
  ): Promise<{ imagePath: string }> {
    const imagePath = await this.avatarServices.saveAvatar(user.username, file);

    return {
      imagePath: imagePath,
    };
  }
}
