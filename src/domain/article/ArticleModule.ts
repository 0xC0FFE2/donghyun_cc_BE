import { Module } from '@nestjs/common';
import { ArticleCreateService } from './service/ArticleCreateService';
import { ArticleReadService } from './service/ArticleReadService';
import { ArticleUpdateService } from './service/ArticleUpdateService';
import { ArticleDeleteService } from './service/ArticleDeleteService';
import { ArticleController } from './presentation/ArticleController';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleCreateService,ArticleReadService,ArticleUpdateService,ArticleDeleteService],
})
export class AppModule {}
