import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Article } from '@/blog/entities/article.entity';
import { User } from '@/users/user.entity';

export class ArticleCreateDto extends PickType(Article, ['title', 'text']) {}

class ArticleAuthorDto extends PickType(User, ['id', 'username']) {}

export class ArticleCreatedDto extends PickType(Article, [
  'id',
  'title',
  'text',
  'createdAt',
  'updatedAt',
]) {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  author: ArticleAuthorDto;
}
