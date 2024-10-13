import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './domain/Blog.entity';
import { BlogReadService } from './service/BlogReadService';
import { BlogUpdateService } from './service/BlogUpdateService';
//import { BlogController } from './presentation/BlogController';
import { InternalServerException } from './exception/InternalServerExcaption';
import { BlogController } from './presentation/BlogController';
import { InitalizeBlogRepository } from './domain/reposiroty/Initalize';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
    ],
    controllers: [BlogController],
    providers: [
        BlogReadService,
        BlogUpdateService,
        InitalizeBlogRepository,
    ],
    exports: [
        
    ]
})
export class BlogModule { }
