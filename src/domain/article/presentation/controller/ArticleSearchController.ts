import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleResponse } from '../dto/response/ArticleResponse';
import { ArticleSearchService } from '../../service/ArticleSearchService';

@ApiTags('search')
@Controller('search')
export class ArticleSearchController {
    constructor(
        private readonly articleSearchService: ArticleSearchService,
    ) { }

    @Get("/category/:category_id")
    @ApiOperation({ summary: 'Get articles by category' })
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
        @Param('category_id') categoryId: string,
        @Param('size') pageSize: number
    ): Promise<{ articles: ArticleResponse[], totalPage: number }> {
        return this.articleSearchService.searchArticlesByCategoryIds(pageSize, page, categoryId, false);
    }
}
