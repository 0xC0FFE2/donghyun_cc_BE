import { Controller, Get } from "@nestjs/common";
import { BlogReadService } from "../service/BlogReadService";
import { BlogResponse } from "./dto/response/BlogResponse";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogReadService: BlogReadService,
    ) { }

    @Get('info')
    async GetBlogInfo(): Promise<BlogResponse> {
        return this.blogReadService.getBlogInfo();
    }
}