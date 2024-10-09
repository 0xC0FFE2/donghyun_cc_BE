import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { redisConfig } from '../../../../global/conf/redisconfig';

@Injectable()
export class VisitorRepository {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis(redisConfig);
    }

    private getVisitorByDate(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async getVisitor(): Promise<number> {
        const todayDate = this.getCurrentDate();
        return parseInt(await this.getVisitorByDate(todayDate));
    }

    async deleteVisitorHistory(): Promise<'OK'> {
        return this.redisClient.reset();
    }

    async addVisitorByTodayDate(): Promise<'OK'> {
        const todayDate = this.getCurrentDate();
        var visitors = parseInt(await this.getVisitorByDate(todayDate));
        if (!visitors) visitors = 0;
        return this.redisClient.set(todayDate, ++visitors);
    }

    private getCurrentDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
