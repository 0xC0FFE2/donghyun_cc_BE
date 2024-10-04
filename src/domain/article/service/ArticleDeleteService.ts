import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
import { ArticleNotFoundException } from '../exception/ArticleNotFoundExpection';

@Injectable()
export class ArticleDeleteService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
    ) { }

    async deleteArticle(ArticleId: string): Promise<boolean> {
        try {
            const execute = await this.articleRepository.delete({ article_id: ArticleId });

            if (execute.affected === 0) {
                throw new ArticleNotFoundException();
            }

            return true;
        } catch (error) {
            throw new InternalServerException();
        }
    }
}
