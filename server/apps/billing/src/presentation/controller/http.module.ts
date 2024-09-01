import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { ApplicationModule } from '@/billing/application/application.module';
import { BillingController } from './billing.controller';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [BillingController],
  exports: [],
})
export class HttpModule {}
