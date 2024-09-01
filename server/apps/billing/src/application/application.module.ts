import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  INVENTORY_SERVICE,
  ORDER_SERVICE,
  RmqModule,
  USER_SERVICE,
} from '@libs/shared';
import { BillingService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { MidtransModule } from '../infrastructure/midtrans/midtrans.module';

import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';

import { OrderService } from './service/order.service';
import { UserService } from './service/user.service';
import { InventoryService } from './service/inventory.service';
import { GetPaymentMethod } from '../common/payment';

@Module({
  imports: [
    RmqModule.register({ name: USER_SERVICE }),
    RmqModule.register({ name: ORDER_SERVICE }),
    RmqModule.register({ name: INVENTORY_SERVICE }),
    PersistenceModule,
    MidtransModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        clientKey: config.get<string>('MIDTRANS_CLIENT_KEY'),
        serverKey: config.get<string>('MIDTRANS_SERVER_KEY'),
        merchantId: config.get<string>('MIDTRANS_MERCHANT_ID'),
        sandbox: config.get<string>('MIDTRANS_MODE') === 'sandbox',
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    BillingService,
    OrderService,
    UserService,
    InventoryService,
    GetPaymentMethod,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    BillingService,
    OrderService,
    UserService,
    InventoryService,
    GetPaymentMethod,
  ],
})
export class ApplicationModule {}
