import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '@libs/shared';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      return res.status(401).json({
        message: 'No refresh token provided',
      });
    }

    const token = await this.cookieService.decompressToken(refreshToken);

    try {
      const data = await this.authService.refresh(token);

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
