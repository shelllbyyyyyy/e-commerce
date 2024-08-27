import { Module } from '@nestjs/common';

import { InventoryService } from '@libs/domain';
import { PRODUCT_SERVICE, RmqModule } from '@libs/shared';

import { PersistenceModule } from '@/inventory/infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';
import { ProductService } from './services/product.service';

@Module({
  imports: [PersistenceModule, RmqModule.register({ name: PRODUCT_SERVICE })],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    InventoryService,
    ProductService,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    InventoryService,
    ProductService,
  ],
})
export class ApplicationModule {}
