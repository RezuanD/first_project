import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/blog/entities/article.entity';
import { ArticleService } from '@/blog/article.service';
import { ArticleController } from '@/blog/blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ConfigModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class BlogModule {}
