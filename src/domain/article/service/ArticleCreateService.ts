import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presention/dto/request/CreateArticleRequest';
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';

@Injectable()
export class ArticleCreateService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
    ) { }

    async createArticle(createArticleDto: CreateArticleRequest): Promise<Article> {
        try {
            const article = await this.articleRepository.create(createArticleDto);
            await this.articleRepository.save(article);
            return article;
        } catch (error) {
            throw new InternalServerException;
        }
    }
}
