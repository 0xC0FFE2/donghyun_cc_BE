import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OAuthController } from './presentation/controller/AuthController';
import { OAuthService } from './service/OAuthService';

@Module({
  imports: [HttpModule],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}