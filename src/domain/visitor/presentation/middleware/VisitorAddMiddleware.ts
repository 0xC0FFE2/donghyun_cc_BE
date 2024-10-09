import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitorAddService } from '../../service/VisitorAddService';

@Injectable()
export class VisitorAddMiddleware implements NestMiddleware {
    constructor(private readonly visitorAddService: VisitorAddService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        await this.visitorAddService.AddVisitor();
        next();
    }
}
