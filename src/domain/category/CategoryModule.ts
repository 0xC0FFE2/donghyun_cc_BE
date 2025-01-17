import { Module } from '@nestjs/common';
import { CategoryCreateService } from './service/CategoryCreateService';
import { CategoryReadService } from './service/CategoryReadService';
import { CategoryUpdateService } from './service/CategoryUpdateService';
import { CategoryDeleteService } from './service/CategoryDeleteService';
import { CategoryController } from './presentation/CategoryController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './domain/Category.entity';
import { AuthModule } from 'src/global/auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryCreateService,CategoryReadService,CategoryUpdateService,CategoryDeleteService],
})
export class CategoryModule {}
