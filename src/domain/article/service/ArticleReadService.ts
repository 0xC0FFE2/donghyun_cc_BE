import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { InternalServerException } from '../exception/InternalServerException';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
import { Viewmode } from '../domain/enum/Viewmode';

@Injectable()
export class ArticleReadService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
    ) { }

    async readArticle(articleId: string, isAdmin: boolean): Promise<Article> {
        try {
            const article = await this.articleRepository.findOne({ where: { article_id: articleId } });

            if (!article) {
                throw new NotFoundException('Article Not Found');
            }

            if (article.article_view_mode === Viewmode.PRIVATE && !isAdmin) {
                throw new ForbiddenException('Article is not viewable');
            }

            return article;
        } catch (error) {
            throw new InternalServerException(error);
        }
    }

    async getArticles(article_page: number, isAdmin: boolean): Promise<{ articles: Article[], totalPage: number }> {
        const pageSize = 8;
        try {
            const [articles, totalCount] = await this.articleRepository.findAndCount({
                where: isAdmin ? {} : { article_view_mode: Viewmode.PUBLIC },
                skip: (article_page - 1) * pageSize,
                take: pageSize,
                order: { article_date: 'DESC' }
            });

            if (articles.length === 0) {
                throw new NotFoundException('No article found!');
            }

            const totalPage = Math.ceil(totalCount / pageSize);
            return { articles, totalPage };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerException(error);
        }
    }

}
