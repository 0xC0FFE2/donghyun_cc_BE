import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { redisConfig } from '../../../../global/conf/redisconfig';

@Injectable()
export class VisitorRepository {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis(redisConfig);
    }

    private getVisitorByDateAndIP(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async getVisitorCountByDate(): Promise<number> {
        const todayDate = this.getCurrentDate();
        const visitorsData = await this.redisClient.keys(`${todayDate}-*`);
        let totalVisitors = 0;

        for (const key of visitorsData) {
            const count = parseInt(await this.redisClient.get(key)) || 0;
            totalVisitors += count;
        }

        return totalVisitors;
    }

    async deleteVisitorHistory(): Promise<'OK'> {
        return this.redisClient.reset();
    }

    async addVisitorByTodayDate(ip: string): Promise<'OK'> {
        const todayDate = this.getCurrentDate();
        const ipKey = `${todayDate}-${ip}`;
        let visitors = parseInt(await this.getVisitorByDateAndIP(ipKey)) || 0;

        visitors += 1;

        return this.redisClient.set(ipKey, visitors);
    }

    private getCurrentDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
