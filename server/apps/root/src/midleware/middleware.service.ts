import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      return res.status(401).json({
        message: 'No refresh token provided',
      });
    }

    try {
      const data = await this.authService.refresh(refreshToken);

      res.cookie('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        sameSite: 'lax',
        path: '/',
      });

      req.cookies.access_token = data.access_token;

      next();
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(401).json({
        message: 'Invalid refresh token',
      });
    }
  }
}
