import { Module } from '@nestjs/common';
import { AuthStrategy } from './strategies/AuthStrategy';
import { AdminGuard } from './guard/AdminGuard';

@Module({
    providers: [AuthStrategy, AdminGuard],
    exports: [AuthStrategy,AdminGuard],
})
export class AuthModule { }
