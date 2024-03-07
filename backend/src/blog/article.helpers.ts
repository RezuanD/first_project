import { Injectable } from '@nestjs/common';
import { CreatedArticleDto } from './dto/article.dto';
import { Article } from '@/blog/entities/article.entity';

@Injectable()
export class ArticleHelpers {
  async convertToArticleCreated(article: Article): Promise<CreatedArticleDto> {
    return {
      ...article,
      author: {
        username: article.author.username,
        id: article.author.id,
      },
    };
  }
}
