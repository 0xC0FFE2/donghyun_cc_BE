import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { UpdateArticleRequest } from '../presentation/dto/request/UpdateArticleRequest'; // 'presentation'의 철자 수정
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleNotFoundException } from '../exception/ArticleNotFoundExpection';
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
            const article = await this.articleRepository.findOne({ where: { article_id: articleId } });

            if (!article) {
                throw new ArticleNotFoundException();
            }

            // 업데이트할 필드 설정
            article.article_name = updateArticleDto.article_name ?? article.article_name;
            article.thumbnail_url = updateArticleDto.thumbnail_url ?? article.thumbnail_url;
            article.article_data_url = updateArticleDto.article_data_url ?? article.article_data_url;
            article.article_view_mode = updateArticleDto.article_view_mode ?? article.article_view_mode;

            if (updateArticleDto.categories) {
                const existingCategories = await this.categoryRepository.find({
                    where: { category_id: In(updateArticleDto.categories) },
                });

                const existingCategoryIds = existingCategories.map(category => category.category_id);
                const newCategoryNames = updateArticleDto.categories.filter(categoryId => !existingCategoryIds.includes(categoryId));

                const newCategories: Category[] = [];
                for (const categoryName of newCategoryNames) {
                    const newCategory = this.categoryRepository.create({ category_name: categoryName });
                    newCategories.push(newCategory);
                }

                if (newCategories.length > 0) {
                    await this.categoryRepository.save(newCategories);
                }

                article.categorys = [...existingCategories, ...newCategories];
            }

            return await this.articleRepository.save(article);
        } catch (error) {
            throw new InternalServerException();
        }
    }

}
