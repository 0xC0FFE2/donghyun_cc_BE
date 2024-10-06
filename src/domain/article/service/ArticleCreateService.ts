import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { InternalServerException } from '../exception/InternalServerException';
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
            const article = this.articleRepository.create(createArticleDto);

            if (createArticleDto.categories && createArticleDto.categories.length > 0) {
                const categories = await this.categoryRepository.find({
                    where: { category_id: In(createArticleDto.categories) }
                });

                if (categories.length !== createArticleDto.categories.length) {
                    const foundCategoryIds = categories.map(cat => cat.category_id);
                    const notFoundIds = createArticleDto.categories.filter(id => !foundCategoryIds.includes(id));
                    throw new BadRequestException(`Categories not found: ${notFoundIds.join(', ')}`);
                }

                article.categorys = categories;
            }

            return await this.articleRepository.save(article);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerException(error);
        }
    }
}
