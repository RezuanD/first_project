import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@/blog/entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  create() {
    return '';
  }

  findAll() {
    return ``;
  }

  findOne() {
    return ``;
  }

  update() {
    return ``;
  }

  remove() {
    return ``;
  }
}
