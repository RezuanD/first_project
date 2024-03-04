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
import {
  CreateUserDto,
  CreatedUser,
  UpdateUserDto,
} from '@/users/dto/user.dto';
import { UserService } from '@/users/services/users.service';
import { AvatarUploadDto } from './dto/avatar.dto';
import { AvatarsService } from './services/avatar.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly avatarsService: AvatarsService,
  ) {}

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

  @Put('/avatar')
  @ApiOkResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Set avatar for user',
    type: AvatarUploadDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<{ imagePath: string }> {
    return {
      imagePath: await this.avatarsService.saveAvatar(req.user.username, file),
    };
  }
}
