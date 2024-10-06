import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryCreateService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async createCategory(createCategoryDto: CreateCategoryRequest): Promise<Category> {
        try {
            const category = this.categoryRepository.create(createCategoryDto);
            return await this.categoryRepository.save(category);
        } catch (error) {
            throw new InternalServerException();
        }
    }
}