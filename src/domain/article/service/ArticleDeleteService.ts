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

    async createArticle(ArticleId: string): Promise<boolean> {
        try {
            const Article = await this.articleRepository.findOne({ where: { article_id: ArticleId } })
            await this.articleRepository.save(Article);
            return true;
        } catch (error) {
            throw new InternalServerException;
        }
    }
}
