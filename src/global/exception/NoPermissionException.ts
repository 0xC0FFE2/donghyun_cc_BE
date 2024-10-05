import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotFoundException extends HttpException {
    constructor() {
        super('No Permission to Access', HttpStatus.FORBIDDEN);
    }
}