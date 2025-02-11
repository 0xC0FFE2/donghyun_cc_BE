import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthStrategy {
  private readonly AUTH_URL: string;
  private readonly ADMIN_EMAIL = 'admin@donghyun.cc';

  constructor(private readonly httpService: HttpService) {
    this.AUTH_URL = 'https://auth.nanu.cc/auth/get/email';
  }

  async validateToken(token: string): Promise<boolean> {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const response = await firstValueFrom(
        this.httpService
          .get(this.AUTH_URL, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('Token validation failed:', error.message);
              throw new UnauthorizedException('Invalid or expired token');
            }),
          ),
      );

      return response === this.ADMIN_EMAIL;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
