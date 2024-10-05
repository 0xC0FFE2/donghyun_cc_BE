import { IsString, IsNotEmpty } from "class-validator";

export class UpdateCategoryRequest {
    @IsString()
    @IsNotEmpty()
    category_id: string;

    @IsString()
    @IsNotEmpty()
    category_name: string;
}