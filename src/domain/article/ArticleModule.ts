import { Module } from '@nestjs/common';
import { ArticleCreateService } from './service/ArticleCreateService';
import { ArticleReadService } from './service/ArticleReadService';
import { ArticleUpdateService } from './service/ArticleUpdateService';
import { ArticleDeleteService } from './service/ArticleDeleteService';
import { ArticleController } from './presentation/ArticleController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './domain/Article.entity';
import { ArticleRepository } from './domain/repository/ArticleRepository';
import { Category } from '../category/domain/Category.entity';
import { CategoryRepository } from '../category/domain/repository/CategoryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleRepository]),
    TypeOrmModule.forFeature([Category, CategoryRepository]),
  ],
  controllers: [ArticleController],
  providers: [ArticleCreateService, ArticleReadService, ArticleUpdateService, ArticleDeleteService],
})
export class ArticleModule { }
