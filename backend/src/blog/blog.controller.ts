import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ArticleService } from '@/blog/article.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create() {
    return this.articleService.create();
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
