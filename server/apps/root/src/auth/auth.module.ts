import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { RmqModule, AUTH_SERVICE } from '@libs/shared';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@/auth/common/strategies/jwt.strategy';
import { GoogleOauthGuard } from './guard/google-auth.guard';
import { GoogleStrategy } from './strategies/google.startegy';

@Module({
  imports: [
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        CLIENT_URL: Joi.string().required(),
      }),
      envFilePath: './apps/root/.env',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleOauthGuard, GoogleStrategy],
})
export class AuthModule {}
