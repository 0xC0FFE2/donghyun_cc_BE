import { Injectable, NotFoundException } from "@nestjs/common";
import { BlogResponse } from "../presentation/dto/response/BlogResponse";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InternalServerException } from "../exception/InternalServerExcaption";
import { Blog } from "../domain/Blog.entity";
import { BLOGCONFIG } from "src/global/conf/blogconfig";

@Injectable()
export class BlogReadService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) { }

    async getBlogInfo(): Promise<BlogResponse> {
        try {
            const blog = await this.blogRepository.findOne({ where: { blog_name: BLOGCONFIG.BLOG_NAME } })
            if (!blog) throw new Error;
            
            return this.mapToBlogResponse(blog);
        } catch (error) {
            throw new InternalServerException(error);
        }
    }

    private mapToBlogResponse(blog: Blog): BlogResponse {
        return {
            blog_total_views: blog.blog_visitors_total, // 엔티티의 값 매핑
            blog_total_articles: blog.blog_total_articles, // 엔티티의 값 매핑
        };
    }
}