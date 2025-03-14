import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "../domain/Blog.entity";
import { Repository } from "typeorm";
import { BLOGCONFIG } from "../../../global/conf/blogconfig"
import { InternalServerException } from "../exception/InternalServerExcaption";

@Injectable()
export class BlogUpdateService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) { }

    async addTotalvisitor(addValue: number): Promise<boolean> {
        try {
            const Blog = await this.blogRepository.findOne({ where: { blog_name: BLOGCONFIG.BLOG_NAME } })
            if (!Blog) throw new Error;

            Blog.blog_visitors_total = Blog.blog_visitors_total + addValue;

            this.blogRepository.save(Blog);
            return true;

        } catch (error) {
            throw new InternalServerException(error)
        }
    }
}