import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthStrategy {
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.post('https://auth.nanu.cc/api/oauth/client_auth/k2w57f', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token validation failed:', error);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
