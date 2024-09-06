import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';

import { HttpModule } from './presentation/controller/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        VERIFY_TOKEN_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        BASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
})
export class AppModule {}
