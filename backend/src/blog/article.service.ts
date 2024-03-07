import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@/blog/entities/article.entity';
import { ArticleCreateDto, CreatedArticleDto } from '@/blog/dto/article.dto';
import { ArticleHelpers } from '@/blog/article.helpers';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { RequestUserPayload } from '@/users/types';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly userHelpers: UserHelpers,
    private readonly articleHelpers: ArticleHelpers,
  ) {}

  async createArticle(
    article: ArticleCreateDto,
    author: RequestUserPayload,
  ): Promise<CreatedArticleDto> {
    const user = await this.userHelpers.getUserById(author.userId);

    const createdArticle = await this.articleRepository.save({
      ...article,
      author: user,
    });

    const filteredArticle =
      await this.articleHelpers.convertToArticleCreated(createdArticle);

    return filteredArticle;
  }

  findAll() {
    return ``;
  }

  async findArticle(id: string) {
    const foundArticle = await this.articleRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });

    const filteredArticle =
      await this.articleHelpers.convertToArticleCreated(foundArticle);

    return filteredArticle;
  }

  update() {
    return ``;
  }

  async removeArticle(articleId: string, userId: string): Promise<boolean> {
    const foundArticle = await this.articleRepository.findOneBy({
      id: articleId,
    });

    if (!foundArticle) {
      throw new NotFoundException('Article not found');
    }

    if (foundArticle.authorId !== userId) {
      throw new ForbiddenException(
        `User doesn't have rights to delete article`,
      );
    }

    await foundArticle.remove();

    return true;
  }
}
