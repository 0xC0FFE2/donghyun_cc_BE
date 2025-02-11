import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOAuthCodeException extends HttpException {
  constructor() {
    super('Invalid OAuth Token', HttpStatus.FORBIDDEN);
  }
}
