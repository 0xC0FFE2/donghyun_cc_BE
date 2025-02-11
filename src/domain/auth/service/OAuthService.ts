import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InvalidOAuthCodeException } from '../exception/InvalidOAuthCode';
import { AuthVerifyDto } from '../presentation/dto/request/NANUIDAuthRequest';
import { TokenResponseDto } from '../presentation/dto/response/TokenResponse';

@Injectable()
export class OAuthService {
  private readonly authUrl = 'https://auth.nanu.cc/oauth/code';
  private readonly applicationSecret =
    process.env.APPLICATION_SECRET || 'not_provided';

  constructor(private readonly httpService: HttpService) {}

  async verifyAndGetToken(code: string): Promise<TokenResponseDto> {
    const verifyData: AuthVerifyDto = {
      authCode: code,
      applicationSecret: this.applicationSecret,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.authUrl, verifyData),
      );

      if (response.status !== 200) {
        throw new InvalidOAuthCodeException();
      }

      const tokenResponse: TokenResponseDto = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };

      return tokenResponse;
    } catch (error) {
      if (error.response) {
        throw new InvalidOAuthCodeException();
      }
      throw new InvalidOAuthCodeException();
    }
  }
}
