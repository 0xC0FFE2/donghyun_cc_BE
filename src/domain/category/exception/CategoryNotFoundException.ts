import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException {
    constructor() {
        super('Category Not Found',HttpStatus.NOT_FOUND);
    }
}