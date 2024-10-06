import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../domain/Article.entity';
import { CreateArticleRequest } from '../presentation/dto/request/CreateArticleRequest';
import { InternalServerException } from '../exception/InternalServerException';
import { Category } from 'src/domain/category/domain/Category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ArticleCreateService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
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
