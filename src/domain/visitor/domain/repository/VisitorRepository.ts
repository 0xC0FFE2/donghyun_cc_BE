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
        return visitorsData.length;
    }

    async deleteVisitorHistory(): Promise<'OK'> {
        return this.redisClient.flushdb();
    }

    async addVisitorByTodayDate(ip: string): Promise<'OK' | null> {
        const todayDate = this.getCurrentDate();
        const ipKey = `${todayDate}-${ip}`;
        
        const existingVisitor = await this.getVisitorByDateAndIP(ipKey);
        if (existingVisitor) { //이미 방문한 IP라면 카운팅X
            return null;
        }
        
        return this.redisClient.set(ipKey, 1);
    }

    private getCurrentDate(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}