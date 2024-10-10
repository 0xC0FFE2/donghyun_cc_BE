import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VisitorRepository } from "../domain/repository/VisitorRepository";

@Injectable()
export class VisitorAddService {
    constructor(
        @InjectRepository(VisitorRepository)
        private readonly visitorRepository: VisitorRepository
    ) { }

    async AddVisitor(userIp) {
        return this.visitorRepository.addVisitorByTodayDate(userIp);
    }

    async DeleteVisitor() {
        return this.visitorRepository.deleteVisitorHistory();
    }

    async GetVisitor() {
        return this.visitorRepository.getVisitorCountByDate();
    }
}