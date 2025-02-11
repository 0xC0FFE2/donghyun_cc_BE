import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OAuthService } from '../../service/OAuthService';
import { VerifyCodeDto } from '../dto/request/OAuthRequest';
import { TokenResponseDto } from '../dto/response/TokenResponse';
import { InvalidOAuthCodeException } from '../../exception/InvalidOAuthCode';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post('token')
  async getToken(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<TokenResponseDto> {
    try {
      return await this.oauthService.verifyAndGetToken(verifyCodeDto.code);
    } catch (error) {
      throw new InvalidOAuthCodeException()
    }
  }
}
