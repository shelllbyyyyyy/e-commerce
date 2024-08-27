import { Module } from '@nestjs/common';

import { ORDER_SERVICE, RmqModule } from '@libs/shared';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    RmqModule.register({
      name: ORDER_SERVICE,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
