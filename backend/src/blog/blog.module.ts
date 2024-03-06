import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/blog/entities/article.entity';
import { ArticleService } from '@/blog/article.service';
import { ArticleHelpers } from '@/blog/article.helpers';
import { ArticleController } from '@/blog/blog.controller';
import { UserHelpers } from '@/users/helpers/users.helpers';
import { User } from '@/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User]), ConfigModule],
  controllers: [ArticleController],
  providers: [ArticleService, UserHelpers, ArticleHelpers],
})
export class BlogModule {}
