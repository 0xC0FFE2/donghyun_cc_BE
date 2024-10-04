import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from '../service/ArticleCreateService';
import { CreateArticle } from './dto/create-article.dto';
import { ArticleResponse } from './dto/article-response.dto';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post()
    async create(@Body() createArticleDto: CreateArticle): Promise<ArticleResponse> {
        return this.articleService.createArticle(createArticleDto);
    }
}
