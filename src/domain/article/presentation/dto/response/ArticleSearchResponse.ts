import { IsString, IsArray, IsOptional } from 'class-validator';

export class ArticleSearchResponse {
    @IsString()
    article_id: string;

    @IsString()
    article_name: string;

    @IsString()
    thumbnail_url: string;

    @IsString()
    article_date: string;

    @IsArray()
    @IsOptional()
    categories?: string[];
}
