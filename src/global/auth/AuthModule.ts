import { Module } from '@nestjs/common';
import { AuthStrategy } from './strategies/AuthStrategy';
import { AdminGuard } from './guard/AdminGuard';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [AuthStrategy, AdminGuard],
    exports: [AuthStrategy,AdminGuard],
})
export class AuthModule { }
