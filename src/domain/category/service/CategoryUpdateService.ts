import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../domain/repository/CategoryRepository';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { CategoryNotFoundException } from '../exception/CategoryNotFoundException';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { UpdateCategoryRequest } from '../presentation/dto/request/UpdateCategoryRequest';

@Injectable()
export class CategoryUpdateService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async updateCategory(updateCategoryDto: UpdateCategoryRequest): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne({
                where: { category_id: updateCategoryDto.category_id }
            });
            
            if (!category) {
                throw new CategoryNotFoundException();
            }

            category.category_name = updateCategoryDto.category_name;
            return await this.categoryRepository.save(category);
        } catch (error) {
            if (error instanceof CategoryNotFoundException) throw error;
            throw new InternalServerException();
        }
    }
}