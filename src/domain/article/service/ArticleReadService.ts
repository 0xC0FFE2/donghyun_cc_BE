import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { InternalServerException } from '../exception/InternalServerException';
import { Viewmode } from '../domain/enum/Viewmode';
import { Repository } from 'typeorm';
import { ArticleResponse } from '../presentation/dto/response/ArticleResponse';

@Injectable()
export class ArticleReadService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) { }

    async readArticle(articleId: string, isAdmin: boolean): Promise<ArticleResponse> {
        const article = await this.articleRepository.findOne({
            where: { article_id: articleId },
            relations: ['categorys'],
            order: { article_id: 'DESC' }
        });
    
        if (!article) {
            throw new NotFoundException('Article Not Found');
        }
    
        if (article.article_view_mode === Viewmode.PRIVATE && !isAdmin) {
            throw new ForbiddenException('Article is not viewable');
        }
        
        const articleResponse = new ArticleResponse();
        articleResponse.article_id = article.article_id;
        articleResponse.article_name = article.article_name;
        articleResponse.thumbnail_url = article.thumbnail_url;
        articleResponse.article_data_url = article.article_data_url;
        articleResponse.article_view_mode = article.article_view_mode;
        articleResponse.article_date = article.article_date;
        articleResponse.categories = article.categorys.map(category => category.category_name);
    
        return articleResponse;
    }


    async getArticles(page_size: number, article_page: number, isAdmin: boolean): Promise<{ articles: Article[], totalPage: number }> {
        try {
            const [articles, totalCount] = await this.articleRepository.findAndCount({
                where: isAdmin ? {} : { article_view_mode: Viewmode.PUBLIC },
                skip: (article_page - 1) * page_size,
                take: page_size,
                order: { article_date: 'DESC' },
                relations: ['categorys']
            });

            if (articles.length === 0) {
                throw new NotFoundException('No article found!');
            }

            const totalPage = Math.ceil(totalCount / page_size);
            return { articles, totalPage };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerException(error);
        }
    }
}
