import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserPayload } from '@/auth/decorators';
import { ArticleService } from '@/blog/article.service';
import {
  ArticleCreateDto,
  CreatedArticleDto,
  UpdateArticleDto,
} from '@/blog/dto/article.dto';
import { MessageDto } from '@/common/dto/message.dto';
import { RequestUserPayload } from '@/users/types';

@Controller('blog/articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedArticleDto })
  @JwtAuthGuard()
  async createArticle(
    @UserPayload() author: RequestUserPayload,
    @Body() articleCreateDto: ArticleCreateDto,
  ) {
    return this.articleService.createArticle(articleCreateDto, author);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: CreatedArticleDto })
  async findArticle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) articleId: string,
  ) {
    return this.articleService.findArticle(articleId);
  }

  @Patch(':id')
  async updateArticle(
    @UserPayload() userPayload: RequestUserPayload,
    @Param('id', new ParseUUIDPipe({ version: '4' })) articleId: string,
    @Body() articleUpdateDto: UpdateArticleDto,
  ) {
    return this.articleService.updateArticle(
      articleId,
      userPayload.userId,
      articleUpdateDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: MessageDto })
  @JwtAuthGuard()
  async removeArticle(
    @UserPayload() userPayload: RequestUserPayload,
    @Param('id', new ParseUUIDPipe({ version: '4' })) articleId: string,
  ) {
    const deletedArticle = await this.articleService.removeArticle(
      articleId,
      userPayload.userId,
    );

    if (deletedArticle) {
      return { message: 'Article deleted successully' };
    }
  }
}
