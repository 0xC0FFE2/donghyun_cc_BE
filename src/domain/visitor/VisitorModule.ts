import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { VisitorAddService } from './service/VisitorAddService';
import { VisitorAddMiddleware } from './presentation/middleware/VisitorAddMiddleware';
import { VisitorRepository } from './domain/repository/VisitorRepository';

@Module({
    imports: [],
    providers: [
        VisitorAddService,
        VisitorRepository
    ],
    exports: [VisitorAddService, VisitorRepository]
})
export class VisitorModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VisitorAddMiddleware)
            .forRoutes({ path: '/articles/*', method: RequestMethod.POST });
    }
}