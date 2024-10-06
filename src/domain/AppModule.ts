// app.module.ts
import { Module } from '@nestjs/common';
import { ArticleModule } from './article/ArticleModule';

@Module({
  imports: [ArticleModule],
})
export class AppModule {}
