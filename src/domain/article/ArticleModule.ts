import { Module } from '@nestjs/common';
import { ArticleCreateService } from './service/ArticleCreateService';
import { ArticleReadService } from './service/ArticleReadService';
import { ArticleUpdateService } from './service/ArticleUpdateService';
import { ArticleDeleteService } from './service/ArticleDeleteService';
import { ArticleController } from './presentation/ArticleController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './domain/Article.entity';
import { Category } from '../category/domain/Category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Category])
  ],
  controllers: [ArticleController],
  providers: [ArticleCreateService, ArticleReadService, ArticleUpdateService, ArticleDeleteService],
})
export class ArticleModule { }
