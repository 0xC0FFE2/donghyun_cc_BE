import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryDeleteService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async deleteCategory(id: string): Promise<void> {
        try {
            const result = await this.categoryRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException('Category not found');
            }
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerException();
        }
    }
}