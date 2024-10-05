import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
@Injectable()
export class ArticleReadService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
    ) { }

    async readArticle(articleId: string): Promise<Article> {
        try {
            const article = await this.articleRepository.findOne({ where: { article_id: articleId } })
            if (!article) {
                throw new NotFoundException('Article Not Found');
            }
            return article;
        } catch (error) {
            throw new InternalServerException;
        }
    }

    async getArticle(article_page: number): Promise<{ articles: Article[], totalPage: number }> {
        const pageSize = 8;

        try {
            const [articles, totalCount] = await this.articleRepository.findAndCount({
                skip: (article_page - 1) * pageSize,
                take: pageSize,
                order: { article_date: 'DESC' }
            })

            const totalPage = Math.ceil(totalCount / pageSize)

            return { articles, totalPage };
        } catch (error) {
            throw new InternalServerException();
        }
    }
}
