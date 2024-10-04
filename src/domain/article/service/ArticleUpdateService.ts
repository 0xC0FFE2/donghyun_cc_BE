import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { UpdateArticleRequest } from '../presentation/dto/request/UpdateArticleRequest'; // 'presentation'의 철자 수정
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleNotFoundException } from '../exception/ArticleNotFoundExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
import { CategoryRepository } from '../../category/domain/repository/CategoryRepository';

@Injectable()
export class ArticleUpdateService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async updateArticle(articleId: string, updateArticleDto: UpdateArticleRequest): Promise<Article> {
        try {
            const article = await this.articleRepository.findOne({ where: { article_id: articleId } });

            if (!article) {
                throw new ArticleNotFoundException();
            }

            // 업데이트할 필드를 설정
            article.article_name = updateArticleDto.article_name ?? article.article_name;
            article.thumbnail_url = updateArticleDto.thumbnail_url ?? article.thumbnail_url;
            article.article_data_url = updateArticleDto.article_data_url ?? article.article_data_url;
            article.article_view_mode = updateArticleDto.article_view_mode ?? article.article_view_mode;

            // 카테고리 업데이트
            if (updateArticleDto.category_ids) {
                const categories = await this.categoryRepository.findByIds(updateArticleDto.category_ids);
                if (categories.length > 0) {
                    article.categorys = categories;  // 카테고리 업데이트
                }
            }

            await this.articleRepository.save(article);
            return article;
        } catch (error) {
            throw new InternalServerException(); // 에러 처리를 좀 더 상세하게 할 수도 있음
        }
    }
}
