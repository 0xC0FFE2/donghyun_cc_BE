import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticleNotFoundException extends HttpException {
    constructor() {
        super('Article Not Found',HttpStatus.NOT_FOUND);
    }
}