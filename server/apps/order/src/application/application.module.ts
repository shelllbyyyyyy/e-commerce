import { Module } from '@nestjs/common';

import { OrderService } from '@libs/domain';
import {
  BILLING_SERVICE,
  CART_SERVICE,
  INVENTORY_SERVICE,
  RmqModule,
} from '@libs/shared';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';
import { CartService } from './service/cart.service';
import { InventoryService } from './service/inventory.service';
import { BillingService } from './service/billing.service';

@Module({
  imports: [
    PersistenceModule,
    RmqModule.register({ name: CART_SERVICE }),
    RmqModule.register({ name: INVENTORY_SERVICE }),
    RmqModule.register({ name: BILLING_SERVICE }),
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    OrderService,
    CartService,
    InventoryService,
    BillingService,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    OrderService,
    CartService,
    InventoryService,
    BillingService,
  ],
})
export class ApplicationModule {}
