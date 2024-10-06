import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerException } from '../exception/InternalServerException';
import { ArticleRepository } from '../domain/repository/ArticleRepository';

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
                throw new NotFoundException('Article not found');
            }

            return true;
        } catch (error) {
            throw new InternalServerException(error);
        }
    }
}
