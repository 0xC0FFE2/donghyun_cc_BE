import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryRequest {
  @IsString()
  @IsNotEmpty()
  category_name: string;
}