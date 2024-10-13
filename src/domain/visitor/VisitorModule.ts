import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { VisitorAddService } from './service/VisitorAddService';
import { VisitorAddMiddleware } from './presentation/middleware/VisitorAddMiddleware';
import { VisitorRepository } from './domain/repository/VisitorRepository';
import { VisitorAutoUpdateService } from './service/VisitorAutoUpdateService';
import { BlogUpdateService } from '../blog/service/BlogUpdateService';
import { InitalizeBlogRepository } from '../blog/domain/reposiroty/Initalize';
import { BlogModule } from '../blog/BlogModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../blog/domain/Blog.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
        ScheduleModule.forRoot(),
        BlogModule,
    ],
    providers: [
        VisitorAddService,
        VisitorRepository,
        BlogUpdateService,
        VisitorAutoUpdateService,
    ],
    exports: [VisitorAddService, VisitorRepository]
})
export class VisitorModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VisitorAddMiddleware)
            .forRoutes({ path: '/articles/*', method: RequestMethod.ALL });
    }
}