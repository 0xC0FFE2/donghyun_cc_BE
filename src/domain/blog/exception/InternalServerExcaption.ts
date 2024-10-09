import { HttpException, HttpStatus } from "@nestjs/common";

export class InternalServerException extends HttpException {
    constructor(error) {
        console.log(error);
        super('Server Error on /BLOG',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}