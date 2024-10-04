import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presention/dto/request/CreateArticleRequest';
import { ArticleResponse } from '../presention/dto/response/ArticleResponse';
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';

@Injectable()
export class ArticleCreateService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
    ) { }

    async createArticle(createArticleDto: CreateArticleRequest): Promise<Article> {
        const Article = this.articleRepository.create({
            ...createArticleDto,
        });
        await this.articleRepository.save(Article);
        return Article;
    }
}
