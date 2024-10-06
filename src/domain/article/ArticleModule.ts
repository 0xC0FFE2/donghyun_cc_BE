import { Module } from '@nestjs/common';
import { ArticleCreateService } from './service/ArticleCreateService';
import { ArticleReadService } from './service/ArticleReadService';
import { ArticleUpdateService } from './service/ArticleUpdateService';
import { ArticleDeleteService } from './service/ArticleDeleteService';
import { ArticleController } from './presentation/ArticleController';
import { AdminArticleController } from './presentation/AdminArticleController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './domain/Article.entity';
import { Category } from '../category/domain/Category.entity';
import { AuthModule } from 'src/global/auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Category]),
    AuthModule,
  ],
  controllers: [ArticleController,AdminArticleController],
  providers: [ArticleCreateService, ArticleReadService, ArticleUpdateService, ArticleDeleteService],
})
export class ArticleModule { }
