import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserPayload } from '@/auth/decorators';
import { ArticleService } from '@/blog/article.service';
import { ArticleCreateDto, ArticleCreatedDto } from '@/blog/dto/article.dto';
import { User } from '@/users/user.entity';

@Controller('blog/articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleCreatedDto })
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

  @Get()
  findOne() {
    return this.articleService.findOne();
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
