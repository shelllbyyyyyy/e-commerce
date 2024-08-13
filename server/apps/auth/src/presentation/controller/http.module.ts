import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';

import { RmqModule } from '@libs/shared';

import { AuthController } from './auth.controller';
import { ApplicationModule } from '@/auth/application/application.module';

@Module({
  imports: [
    ApplicationModule,
    RmqModule,
    // CqrsModule
  ],
  controllers: [AuthController],
})
export class HttpModule {}
