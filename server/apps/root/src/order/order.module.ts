import { Module } from '@nestjs/common';

import { ORDER_SERVICE, RmqModule } from '@libs/shared';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PaymentController } from './payment/payment.controller';

@Module({
  imports: [
    RmqModule.register({
      name: ORDER_SERVICE,
    }),
  ],
  controllers: [OrderController, PaymentController],
  providers: [OrderService],
})
export class OrderModule {}
