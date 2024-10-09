import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "../domain/Blog.entity";
import { Repository } from "typeorm";

@Injectable()
export class BlogReadService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) { }

    async addTotalvisitor(addValue: number): Promise<boolean> {
        try {
            const CurrentTotalVisitor = this.blogRepository.findOne({where: {}})
        } catch (error) {

        }
    }
}