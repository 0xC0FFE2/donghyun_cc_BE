import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitorAddService } from '../../service/VisitorAddService';

@Injectable()
export class VisitorAddMiddleware implements NestMiddleware {
    constructor(private readonly visitorAddService: VisitorAddService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const realIp = req.headers['x-forwarded-for'] || req.ip; //cloudflare proxy 대응 headers 추가
        const ip = Array.isArray(realIp) ? realIp[0] : realIp;
        await this.visitorAddService.AddVisitor(ip);
        next();
    }
}
