import { IsString } from 'class-validator';

export class TokenResponseDto {
  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;
}
