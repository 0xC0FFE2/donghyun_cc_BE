import { Module } from '@nestjs/common';
import { ArticleModule } from './article/ArticleModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/CategoryModule';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database',
            entities: [__dirname + '/**/*.entity{.ts,.js}']
        })
        , ArticleModule
        , CategoryModule],
})
export class AppModule { }
