import { Module } from '@nestjs/common';

import { INVENTORY_SERVICE, RmqModule } from '@libs/shared';

import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [RmqModule.register({ name: INVENTORY_SERVICE })],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
