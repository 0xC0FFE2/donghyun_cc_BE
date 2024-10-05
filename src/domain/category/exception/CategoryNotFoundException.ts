import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException {
    constructor() {
        super('Requested Category Not Found',HttpStatus.NOT_FOUND);
    }
}