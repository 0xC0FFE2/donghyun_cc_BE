import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleCreateService } from '../../service/ArticleCreateService';
import { ArticleReadService } from '../../service/ArticleReadService';
import { ArticleUpdateService } from '../../service/ArticleUpdateService';
import { ArticleDeleteService } from '../../service/ArticleDeleteService';
import { CreateArticleRequest } from '../dto/request/CreateArticleRequest';
import { UpdateArticleRequest } from '../dto/request/UpdateArticleRequest';
import { ArticleResponse } from '../dto/response/ArticleResponse';
import { ArticleSearchResponse } from '../dto/response/ArticleSearchResponse';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
    constructor(
        private readonly articleCreateService: ArticleCreateService,
        private readonly articleReadService: ArticleReadService,
        private readonly articleUpdateService: ArticleUpdateService,
        private readonly articleDeleteService: ArticleDeleteService,
    ) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get an article by ID' })
    @ApiParam({ name: 'id', description: 'Article ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '특정한 게시물의 정보 가져옵니다',
        type: ArticleResponse
    })
    async getArticleById(@Param('id') articleId: string): Promise<ArticleResponse> {
        return this.articleReadService.readArticle(articleId, false);
    }

    @Get()
    @ApiOperation({ summary: '페이지화 된 게시물 목록을 가져옵니다' })
    @ApiQuery({
        name: 'page',
        required: false,
        description: '조회할 페이지 번호 / 기본 : 1',
        type: Number
    })
    @ApiQuery({
        name: 'size',
        required: false,
        description: '한 페이지 의 게시물 수 / 기본 : 8',
        type: Number
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '페이지화 된 게시글의 정보를 JSON으로 반환합니다',
        type: ArticleResponse,
        isArray: true
    })
    async getArticles(
        @Query('page') page: number = 1,
        @Query('size') pageSize: number = 8,
    ): Promise<{ articles: ArticleSearchResponse[], totalPage: number }> {
        const result = await this.articleReadService.getArticles(pageSize, page, false);
        return {
            articles: result.articles.map(this.mapToArticleSearchResponse),
            totalPage: result.totalPage,
        }
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