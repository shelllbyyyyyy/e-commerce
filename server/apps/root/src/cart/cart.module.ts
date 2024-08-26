import { Module } from '@nestjs/common';

import { CART_SERVICE, RmqModule } from '@libs/shared';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [RmqModule.register({ name: CART_SERVICE })],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
