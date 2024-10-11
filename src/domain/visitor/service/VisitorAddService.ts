import { Injectable } from "@nestjs/common";
import { VisitorRepository } from "../domain/repository/VisitorRepository";

@Injectable()
export class VisitorAddService {
    constructor(
        private readonly visitorRepository: VisitorRepository
    ) {}

    async AddVisitor(userIp: string) {
        return this.visitorRepository.addVisitorByTodayDate(userIp);
    }

    async DeleteVisitor() {
        return this.visitorRepository.deleteVisitorHistory();
    }

    async GetVisitor() {
        return this.visitorRepository.getVisitorCountByDate();
    }
}