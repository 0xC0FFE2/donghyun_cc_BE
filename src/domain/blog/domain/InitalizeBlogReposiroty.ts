import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "./Blog.entity";
import { Repository } from "typeorm";

@Injectable()
export class InitalizeBlogRepository implements OnModuleInit {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
    ) { }

    private async InitalizeBlogEntity(blogName: string): Promise<Blog> {
        const thisBlog = await this.blogRepository.findOne({ where: { blog_name: blogName } });

        if (!thisBlog) {
            const newBlog = this.blogRepository.create({
                blog_name: blogName,
                blog_total_articles: 0,
                blog_visitors_total: 0,
                blog_visitors_weekly: 0,
            })

            return await this.blogRepository.save(newBlog)
        } else {
            return thisBlog;
        }
    }

    async onModuleInit() {
        await this.InitalizeBlogEntity("DONGHYUN_CC"); // DONGHYUN_CC 제목으로 블로그 초기화
        console.log('BLOG INITIALIZED')
    }
}