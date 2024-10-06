import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { CategoryCreateService } from '../service/CategoryCreateService';
import { CategoryReadService } from '../service/CategoryReadService';
import { CategoryUpdateService } from '../service/CategoryUpdateService';
import { CategoryDeleteService } from '../service/CategoryDeleteService';
import { CreateCategoryRequest } from './dto/request/CreateCategoryRequest';
import { UpdateCategoryRequest } from './dto/request/UpdateCategoryRequest';
import { CategoryResponse } from './dto/response/CategoryResponse';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryCreateService: CategoryCreateService,
        private readonly categoryReadService: CategoryReadService,
        private readonly categoryUpdateService: CategoryUpdateService,
        private readonly categoryDeleteService: CategoryDeleteService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created successfully', type: CategoryResponse })
    async createCategory(@Body() createCategoryDto: CreateCategoryRequest): Promise<CategoryResponse> {
        const category = await this.categoryCreateService.createCategory(createCategoryDto);
        return this.toCategoryResponse(category);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns all categories', type: [CategoryResponse] })
    async getAllCategories(): Promise<CategoryResponse[]> {
        const categories = await this.categoryReadService.findAll();
        return categories.map(category => this.toCategoryResponse(category));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the specified category', type: CategoryResponse })
    async getCategoryById(@Param('id') id: string): Promise<CategoryResponse> {
        const category = await this.categoryReadService.findById(id);
        return this.toCategoryResponse(category);
    }

    @Put()
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Category updated successfully', type: CategoryResponse })
    async updateCategory(@Body() updateCategoryDto: UpdateCategoryRequest): Promise<CategoryResponse> {
        const category = await this.categoryUpdateService.updateCategory(updateCategoryDto);
        return this.toCategoryResponse(category);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Category deleted successfully' })
    async deleteCategory(@Param('id') id: string): Promise<void> {
        await this.categoryDeleteService.deleteCategory(id);
    }

    private toCategoryResponse(category: any): CategoryResponse {
        return {
            category_id: category.category_id,
            category_name: category.category_name,
            articles: category.articles?.map(article => article.article_id) || []
        };
    }
}