import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { ApplicationModule } from '@/order/application/application.module';
import { OrderController } from './order.controller';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [OrderController],
  exports: [],
})
export class HttpModule {}
