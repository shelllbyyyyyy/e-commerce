import { Module } from '@nestjs/common';

import { InventoryService } from '@libs/domain';

import { PersistenceModule } from '@/inventory/infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, InventoryService],
  exports: [...QueryHandlers, ...CommandHandlers, InventoryService],
})
export class ApplicationModule {}
