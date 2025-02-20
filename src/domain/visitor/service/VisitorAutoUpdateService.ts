import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { VisitorRepository } from '../domain/repository/VisitorRepository';
import { BlogUpdateService } from '../../blog/service/BlogUpdateService';

@Injectable()
export class VisitorAutoUpdateService {
    constructor(
        private readonly visitorRepository: VisitorRepository,
        private readonly blogUpdateService: BlogUpdateService
    ) {}

    @Cron('0 58 23 * * *')
    async handleCron() {
        const visitorCount = await this.visitorRepository.getVisitorCountByDate();
        await this.addTotalVisitor(visitorCount);
    }

    async addTotalVisitor(count: number): Promise<void> {
        console.log(`${count} UPDATED`);
        await this.blogUpdateService.addTotalvisitor(count);
        await this.visitorRepository.deleteVisitorHistory();
    }
}
