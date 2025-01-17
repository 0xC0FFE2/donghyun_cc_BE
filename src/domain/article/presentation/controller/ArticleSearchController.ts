import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleResponse } from '../dto/response/ArticleResponse';
import { ArticleSearchService } from '../../service/ArticleSearchService';
import { ArticleSearchResponse } from '../dto/response/ArticleSearchResponse';

@ApiTags('search')
@Controller('search')
export class ArticleSearchController {
    constructor(
        private readonly articleSearchService: ArticleSearchService,
    ) { }

    @Get("/categories/:category_name")
    @ApiOperation({ summary: 'Get articles by category name' })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number (default: 1)',
        type: Number
    })
    @ApiParam({
        name: 'category_id'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns searched articles',
        type: ArticleResponse,
        isArray: true
    })
    async getArticleByArticleId(
        @Query('page') page: number = 1,
        @Param('category_name') categoryName: string,
        @Param('size') pageSize: number = 4
    ): Promise<{ articles: ArticleSearchResponse[], totalPage: number }> {
        const result = await this.articleSearchService.searchArticlesByCategoryName(pageSize, page, categoryName, false);

        const filteredArticles = result.articles.map(this.mapToArticleSearchResponse);

        return {
            articles: filteredArticles,
            totalPage: result.totalPage,
        };
    }

    private mapToArticleSearchResponse(article: any): ArticleSearchResponse {
        return {
            article_id: article.article_id,
            article_name: article.article_name,
            thumbnail_url: article.thumbnail_url,
            article_date: article.article_date,
            categories: article.categorys?.map(category => category.category_name) ?? [],
        };
    }
}
