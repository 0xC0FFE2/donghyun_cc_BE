import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleCreateService } from '../service/ArticleCreateService';
import { ArticleReadService } from '../service/ArticleReadService';
import { ArticleUpdateService } from '../service/ArticleUpdateService';
import { ArticleDeleteService } from '../service/ArticleDeleteService';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { UpdateArticleRequest } from '../presentation/dto/request/UpdateArticleRequest';
import { Article } from '../domain/Article.entity';

@Controller('articles')
export class ArticleController {
    constructor(
        private readonly articleCreateService: ArticleCreateService,
        private readonly articleReadService: ArticleReadService,
        private readonly articleUpdateService: ArticleUpdateService,
        private readonly articleDeleteService: ArticleDeleteService,
    ) { }

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleRequest): Promise<Article> {
        return this.articleCreateService.createArticle(createArticleDto);
    }

    @Get(':id')
    async getArticleById(@Param('id') articleId: string): Promise<Article> {
        return this.articleReadService.readArticle(articleId);
    }

    @Get()
    async getArticles(
        @Query('page') page: number = 1
    ): Promise<{ articles: Article[], totalPage: number }> {
        return this.articleReadService.getArticle(page);
    }

    @Put(':id')
    async updateArticle(
        @Param('id') articleId: string,
        @Body() updateArticleDto: UpdateArticleRequest
    ): Promise<Article> {
        return this.articleUpdateService.updateArticle(articleId, updateArticleDto);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') articleId: string): Promise<boolean> {
        return this.articleDeleteService.deleteArticle(articleId);
    }
}
