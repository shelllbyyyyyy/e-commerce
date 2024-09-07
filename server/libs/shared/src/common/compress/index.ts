import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { promisify } from 'util';
import * as zlib from 'zlib';

const gzipAsync = promisify(zlib.gzip);
const gunzipAsync = promisify(zlib.unzip);

@Injectable()
export class CookieService {
  async setCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      const compressedAccessToken = await gzipAsync(accessToken);
      const compressedRefreshToken = await gzipAsync(refreshToken);

      const accessTokenBase64 = compressedAccessToken.toString('base64');
      const refreshTokenBase64 = compressedRefreshToken.toString('base64');

      res.cookie('access_token', accessTokenBase64, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 360000,
        path: '/',
      });

      res.cookie('refresh_token', refreshTokenBase64, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    } catch (err) {
      throw new InternalServerErrorException('Error compressing tokens');
    }
  }

  async decompressToken(compressedToken: string): Promise<string> {
    try {
      const buffer = Buffer.from(compressedToken, 'base64');
      const decompressedBuffer = await gunzipAsync(buffer);
      return decompressedBuffer.toString();
    } catch (err) {
      throw new InternalServerErrorException('Error decompressing token');
    }
  }
}
