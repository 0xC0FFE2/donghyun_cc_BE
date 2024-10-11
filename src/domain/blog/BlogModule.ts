import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './domain/Blog.entity'; 
import { BlogReadService } from './service/BlogReadService';
import { BlogUpdateService } from './service/BlogUpdateService';
//import { BlogController } from './presentation/BlogController';
import { InternalServerException } from './exception/InternalServerExcaption'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
    ],
    controllers: [],
    providers: [
        BlogReadService,
        BlogUpdateService,
        //{
            //provide: 'InternalServerExcption',
            //useClass: InternalServerExcaption,
        //},
    ]
})
export class BlogModule { }
