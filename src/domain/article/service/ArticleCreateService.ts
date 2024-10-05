import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { InternalServerException } from '../exception/InternalServerExpection';
import { ArticleRepository } from '../domain/repository/ArticleRepository';
import { Category } from 'src/domain/category/domain/Category.entity';
import { CategoryRepository } from 'src/domain/category/domain/repository/CategoryRepository';
import { In } from 'typeorm';

@Injectable()
export class ArticleCreateService {
    constructor(
        @InjectRepository(ArticleRepository)
        private readonly articleRepository: ArticleRepository,
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async createArticle(createArticleDto: CreateArticleRequest): Promise<Article> {
        try {
            const article = await this.articleRepository.create(createArticleDto);
            await this.articleRepository.save(article);

            if (createArticleDto.categories) {
                const existingCategories = await this.categoryRepository.find({
                    where: { category_id: In(createArticleDto.categories) },
                });

                const existingCategoryIds = existingCategories.map(category => category.category_id);
                const newCategoryNames = createArticleDto.categories.filter(categoryId => !existingCategoryIds.includes(categoryId));

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

            return article;
        } catch (error) {
            throw new InternalServerException;
        }
    }
}
