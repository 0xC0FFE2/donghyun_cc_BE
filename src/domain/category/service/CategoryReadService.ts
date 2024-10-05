import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../domain/repository/CategoryRepository';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { CategoryNotFoundException } from '../exception/CategoryNotFoundException';

@Injectable()
export class CategoryReadService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            throw new InternalServerException();
        }
    }

    async findById(id: string): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne({ where: { category_id: id } });
            if (!category) {
                throw new CategoryNotFoundException();
            }
            return category;
        } catch (error) {
            if (error instanceof CategoryNotFoundException) throw error;
            throw new InternalServerException();
        }
    }
}