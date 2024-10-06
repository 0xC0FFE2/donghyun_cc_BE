import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleCreateService } from '../service/ArticleCreateService';
import { ArticleReadService } from '../service/ArticleReadService';
import { ArticleUpdateService } from '../service/ArticleUpdateService';
import { ArticleDeleteService } from '../service/ArticleDeleteService';
import { CreateArticleRequest } from './dto/request/CreateArticleRequest';
import { UpdateArticleRequest } from './dto/request/UpdateArticleRequest';
import { ArticleResponse } from './dto/response/ArticleResponse';
import { Admin } from 'src/global/auth/decorators/AdminDecorator';
import { Viewmode } from '../domain/enum/Viewmode';
import { AdminGuard } from 'src/global/auth/guard/AdminGuard';

@ApiTags('articles')
@Controller('admin/articles')
@UseGuards(AdminGuard)
@Admin()
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
        return this.articleReadService.readArticle(articleId, true);
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
        return this.articleReadService.getArticles(page, true);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new article' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Article created successfully',
        type: ArticleResponse
    })
    async createArticle(@Body() createArticleDto: CreateArticleRequest): Promise<ArticleResponse> {
        return this.articleCreateService.createArticle(createArticleDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an article' })
    @ApiParam({ name: 'id', description: 'Article ID to update' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Article updated successfully',
        type: ArticleResponse
    })
    async updateArticle(
        @Param('id') articleId: string,
        @Body() updateArticleDto: UpdateArticleRequest
    ): Promise<ArticleResponse> {
        return this.articleUpdateService.updateArticle(articleId, updateArticleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an article' })
    @ApiParam({ name: 'id', description: 'Article ID to delete' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Article deleted successfully',
        type: Boolean
    })
    async deleteArticle(@Param('id') articleId: string): Promise<boolean> {
        return this.articleDeleteService.deleteArticle(articleId);
    }
}