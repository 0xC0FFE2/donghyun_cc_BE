import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArticleModule } from './article/ArticleModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/CategoryModule';
import { BlogModule } from './blog/BlogModule';
import { VisitorModule } from './visitor/VisitorModule';
import { UploadModule } from './upload/FileUploadModule';
import { AuthModule } from 'src/global/auth/AuthModule';
import { OAuthModule } from './auth/OAuthModule';
import { VisitorAddMiddleware } from './visitor/presentation/middleware/VisitorAddMiddleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticleModule,
    CategoryModule,
    BlogModule,
    VisitorModule,
    UploadModule,
    OAuthModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VisitorAddMiddleware).forRoutes('*');
  }
}
