import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@/blog/entities/article.entity';
import {
  ArticleCreateDto,
  CreatedArticleDto,
  UpdateArticleDto,
} from '@/blog/dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(
    article: ArticleCreateDto,
    authorId: string,
  ): Promise<CreatedArticleDto> {
    const createdArticle = await this.articleRepository.save({
      ...article,
      authorId,
    });

    const { author, ...restArticle } = createdArticle;

    return restArticle;
  }

  async findArticle(id: string): Promise<Article> {
    const foundArticle = await this.articleRepository.findOneBy({ id });

    if (!foundArticle) {
      throw new NotFoundException('Article not found');
    }

    return foundArticle;
  }

  async updateArticle(
    articleId: string,
    userId: string,
    articleUpdateDto: UpdateArticleDto,
  ): Promise<Article> {
    if (!Object.keys(articleUpdateDto).length) {
      throw new UnprocessableEntityException(
        'At least one field must be presented',
      );
    }

    const foundArticle = await this.articleRepository.findOneBy({
      id: articleId,
    });

    if (!foundArticle) {
      throw new NotFoundException('Article not found');
    }

    if (foundArticle.authorId !== userId) {
      throw new ForbiddenException(
        `User doesn't have rights to edit this article`,
      );
    }

    for (const fieldName of Object.keys(articleUpdateDto)) {
      foundArticle[fieldName] = articleUpdateDto[fieldName];
    }

    return foundArticle.save();
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
