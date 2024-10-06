import { Module } from '@nestjs/common';
import { CategoryCreateService } from './service/CategoryCreateService';
import { CategoryReadService } from './service/CategoryReadService';
import { CategoryUpdateService } from './service/CategoryUpdateService';
import { CategoryDeleteService } from './service/CategoryDeleteService';
import { CategoryController } from './presentation/CategoryController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './domain/Category.entity';
import { CategoryRepository } from './domain/repository/CategoryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category,CategoryRepository]),
  ],
  controllers: [CategoryController],
  providers: [CategoryCreateService,CategoryReadService,CategoryUpdateService,CategoryDeleteService],
})
export class CategoryModule {}
