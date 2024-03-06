import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { ArticleCreateDto, CreatedArticleDto } from '@/blog/dto/article.dto';
import { User } from '@/users/user.entity';

@Controller('blog/articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedArticleDto })
  @JwtAuthGuard()
  async createArticle(
    @UserPayload() author: User,
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

  @Patch()
  update() {
    return this.articleService.update();
  }

  @Delete()
  remove() {
    return this.articleService.remove();
  }
}
