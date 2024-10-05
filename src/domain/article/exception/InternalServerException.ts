import { HttpException, HttpStatus } from "@nestjs/common";

export class InternalServerException extends HttpException {
    constructor() {
        super('Server Error',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}