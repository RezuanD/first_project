import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Article } from '@/blog/entities/article.entity';

export class ArticleCreateDto extends PickType(Article, ['title', 'text']) {}

class BaseArticleDto extends PickType(Article, [
  'id',
  'title',
  'text',
  'createdAt',
  'updatedAt',
  'authorId',
]) {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class CreatedArticleDto extends BaseArticleDto {}

export class UpdateArticleDto extends PickType(Article, ['title', 'text']) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  text: string;
}

export class UpdatedArticleDto extends BaseArticleDto {}
