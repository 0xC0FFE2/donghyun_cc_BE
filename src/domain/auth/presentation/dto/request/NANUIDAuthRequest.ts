import { IsString } from 'class-validator';

export class AuthVerifyDto {
  @IsString()
  authCode: string;

  @IsString()
  applicationSecret: string;
}
