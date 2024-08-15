import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { HttpModule } from './presentation/controller/http.module';
import { RmqModule, USER_SERVICE } from '@libs/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/user/.env',
    }),
    RmqModule.register({ name: USER_SERVICE }),
    PersistenceModule.register({
      global: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
