import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { InternalServerException } from '../exception/InternalServerException';
import { Viewmode } from '../domain/enum/Viewmode';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleSearchService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) { }

    async searchArticlesByCategoryIds(article_page: number, category_id: string, isAdmin: boolean): Promise<{ articles: Article[], totalPage: number }> {
        const pageSize = 8;
        try {
            const queryBuilder = this.articleRepository.createQueryBuilder('article')
                .leftJoinAndSelect('article.categorys', 'category')
                .where('category.category_id = :categoryId', { categoryId: category_id });

            if (!isAdmin) {
                queryBuilder.andWhere('article.article_view_mode = :viewMode', {
                    viewMode: Viewmode.PUBLIC
                });
            }

            const [articles, totalCount] = await queryBuilder
                .skip((article_page - 1) * pageSize)
                .take(pageSize)
                .orderBy('article.article_date', 'DESC')
                .getManyAndCount();

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