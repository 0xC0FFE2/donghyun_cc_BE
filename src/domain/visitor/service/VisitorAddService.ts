import { Injectable } from "@nestjs/common";
import { Visitor } from "../domain/Visitor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { VisitorRepository } from "../domain/repository/VisitorRepository";

@Injectable()
export class VisitorAddService {
    constructor(
        @InjectRepository(VisitorRepository)
        private readonly visitorRepository: VisitorRepository
    ) { }

    async AddVisitor() {
        return this.visitorRepository.addVisitorByTodayDate();
    }

    async DeleteVisitor() {
        return this.visitorRepository.deleteVisitorHistory();
    }

    async GetVisitor() {
        return this.visitorRepository.getVisitor();
    }
}