import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/blog/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ConfigModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
