import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { HttpModule } from './presentation/controller/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PRODUCT_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
        RABBIT_MQ_INVENTORY_QUEUE: Joi.string().required(),
        CLOUDINARY_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/product/.env',
    }),
    PersistenceModule.register({
      global: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
