import { Module } from '@nestjs/common';

import { CartService } from '@libs/domain';
import { INVENTORY_SERVICE, RmqModule } from '@libs/shared';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';
import { InventoryService } from './service/inventory.service';

@Module({
  imports: [PersistenceModule, RmqModule.register({ name: INVENTORY_SERVICE })],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    CartService,
    InventoryService,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    CartService,
    InventoryService,
  ],
})
export class ApplicationModule {}
