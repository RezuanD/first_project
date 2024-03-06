import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@/blog/entities/article.entity';
import { ArticleCreateDto, ArticleCreatedDto } from '@/blog/dto/article.dto';
import { User } from '@/users/user.entity';
import { UserHelpers } from '@/users/helpers/users.helpers';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly userHelpers: UserHelpers,
  ) {}

  async createArticle(
    article: ArticleCreateDto,
    author: User,
  ): Promise<ArticleCreatedDto> {
    const user = await this.userHelpers.getUserById(author.id);

    const createdArticle = await this.articleRepository.save({
      ...article,
      author: user,
    });

    const filteredArticle = {
      ...createdArticle,
      author: {
        username: createdArticle.author.username,
        id: createdArticle.author.id,
      },
    };

    return filteredArticle;
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
