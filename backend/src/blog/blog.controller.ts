import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { BlogService } from '@/blog/blog.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create() {
    return this.blogService.create();
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get()
  findOne() {
    return this.blogService.findOne();
  }

  @Patch()
  update() {
    return this.blogService.update();
  }

  @Delete()
  remove() {
    return this.blogService.remove();
  }
}
