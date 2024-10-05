import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";

export class CategoryResponse {
    @IsString()
    @IsNotEmpty()
    category_id: string;

    @IsString()
    @IsNotEmpty()
    category_name: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    articles?: string[];
}