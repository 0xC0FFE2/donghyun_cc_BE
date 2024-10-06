import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { UpdateArticleRequest } from '../presentation/dto/request/UpdateArticleRequest'; // 'presentation'의 철자 수정
import { InternalServerException } from '../exception/InternalServerException';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
import { CategoryRepository } from '../../category/domain/repository/CategoryRepository';
import { In } from 'typeorm';
import { Category } from 'src/domain/category/domain/Category.entity';

@Injectable()
export class ArticleUpdateService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async updateArticle(articleId: string, updateArticleDto: UpdateArticleRequest): Promise<Article> {
        try {
            const article = await this.articleRepository.findOne({
                where: { article_id: articleId },
                relations: ['categorys']
            });

            if (!article) {
                throw new NotFoundException(`Article with ID ${articleId} not found`);
            }

            if (updateArticleDto.article_name) article.article_name = updateArticleDto.article_name;
            if (updateArticleDto.thumbnail_url) article.thumbnail_url = updateArticleDto.thumbnail_url;
            if (updateArticleDto.article_data_url) article.article_data_url = updateArticleDto.article_data_url;
            if (updateArticleDto.article_view_mode) article.article_view_mode = updateArticleDto.article_view_mode;

            if (updateArticleDto.categories && updateArticleDto.categories.length > 0) {
                const categories = await this.categoryRepository.find({
                    where: { category_id: In(updateArticleDto.categories) }
                });

                if (categories.length !== updateArticleDto.categories.length) {
                    const foundCategoryIds = categories.map(cat => cat.category_id);
                    const notFoundIds = updateArticleDto.categories.filter(id => !foundCategoryIds.includes(id));
                    throw new BadRequestException(`Categories not found: ${notFoundIds.join(', ')}`);
                }

                article.categorys = categories;
            }

            return await this.articleRepository.save(article);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerException(error);
        }
    }
}