import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { VisitorRepository } from '../domain/repository/VisitorRepository';
import { BlogUpdateService } from 'src/domain/blog/service/BlogUpdateService';

@Injectable()
export class VisitorAutoUpdateService {

    constructor(
        private readonly visitorRepository: VisitorRepository,
        private readonly blogUpdateService: BlogUpdateService
    ) { }

    @Cron('0 0 * * *')
    async handleCron() {
        const visitorCount = await this.visitorRepository.getVisitorCountByDate();
        this.addTotalVisitor(visitorCount);
    }

    addTotalVisitor(count: number): void {
        console.log(`${count} UPDATED`);
        this.blogUpdateService.addTotalvisitor(count);
        this.visitorRepository.deleteVisitorHistory();
    }
}
