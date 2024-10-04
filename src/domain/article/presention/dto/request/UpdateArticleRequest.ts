import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsEnum } from "class-validator";
import { Viewmode } from "src/domain/article/domain/enum/Viewmode";

export class UpdateArticleRequest {
    @IsOptional()
    @IsOptional()
    article_name: string;

    @IsString()
    @IsOptional()
    thumbnail_url: string;

    @IsString()
    @IsOptional()
    article_data_url: string;

    @IsEnum(Viewmode)
    @IsOptional()
    article_view_mode: Viewmode;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    categories: string[];
}