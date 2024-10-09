import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitorAddService } from '../service/VisitorAddService';

@Injectable()
export class VisitorMiddleware implements NestMiddleware {
    constructor(private readonly visitorAddService: VisitorAddService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        await this.visitorAddService.AddVisitor();
        next();
    }
}
