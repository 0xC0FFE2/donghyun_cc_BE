import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequest } from '../presentation/dto/request/CreateCategoryRequest';
import { Category } from '../domain/Category.entity';
import { InternalServerException } from '../exception/InternalServerErrorException';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryReadService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
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
                throw new NotFoundException('Category not found');
            }
            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerException();
        }
    }
}
