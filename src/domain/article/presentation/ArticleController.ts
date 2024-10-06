import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleCreateService } from '../service/ArticleCreateService';
import { ArticleReadService } from '../service/ArticleReadService';
import { ArticleUpdateService } from '../service/ArticleUpdateService';
import { ArticleDeleteService } from '../service/ArticleDeleteService';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { UpdateArticleRequest } from '../presentation/dto/request/UpdateArticleRequest';
import { ArticleResponse } from '../presentation/dto/response/ArticleResponse';

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
        description: 'Returns the specified article',
        type: ArticleResponse
    })
    async getArticleById(@Param('id') articleId: string): Promise<ArticleResponse> {
        return this.articleReadService.readArticle(articleId, false);
    }

    @Get()
    @ApiOperation({ summary: 'Get paginated articles' })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number (default: 1)',
        type: Number
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns paginated articles',
        type: ArticleResponse,
        isArray: true
    })
    async getArticles(
        @Query('page') page: number = 1
    ): Promise<{ articles: ArticleResponse[], totalPage: number }> {
        return this.articleReadService.getArticles(page, false);
    }
}