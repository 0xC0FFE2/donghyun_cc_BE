import { IsString, IsNotEmpty } from "class-validator";

export class BlogResponse {
    @IsString()
    @IsNotEmpty()
    blog_total_views: number;

    @IsString()
    @IsNotEmpty()
    blog_total_articles: number;
}