import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthStrategy } from '../strategies/AuthStrategy';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authStrategy: AuthStrategy) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('No access token provided.');
    }

    const isValid = await this.authStrategy.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Access token is invalid or expired.');
    }

    return true;
  }
}
