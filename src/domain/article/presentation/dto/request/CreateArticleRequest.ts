import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsEnum } from "class-validator";
import { Viewmode } from "src/domain/article/domain/enum/Viewmode";

export class CreateArticleRequest {
    @IsString()
    @IsNotEmpty()
    article_name: string;

    @IsString()
    @IsNotEmpty()
    thumbnail_url: string;

    @IsString()
    @IsNotEmpty()
    article_data_url: string;

    @IsEnum(Viewmode)
    @IsOptional()
    article_view_mode: Viewmode;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    categories: string[];
}