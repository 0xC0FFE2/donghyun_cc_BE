import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../domain/repository/CategoryRepository';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { CategoryNotFoundException } from '../exception/CategoryNotFoundException';
@Injectable()
export class CategoryDeleteService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async deleteCategory(id: string): Promise<void> {
        try {
            const result = await this.categoryRepository.delete(id);
            if (result.affected === 0) {
                throw new CategoryNotFoundException();
            }
        } catch (error) {
            if (error instanceof CategoryNotFoundException) throw error;
            throw new InternalServerException();
        }
    }
}