import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/blog/entities/article.entity';
import { ArticleService } from '@/blog/article.service';
import { ArticleController } from '@/blog/blog.controller';
import { User } from '@/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User]), ConfigModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class BlogModule {}
