import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticleAlreadyExistsException extends HttpException {
    constructor() {
        super('Already Exits Article',HttpStatus.CONFLICT);
    }
}