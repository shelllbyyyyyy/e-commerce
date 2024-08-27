import { Module } from '@nestjs/common';

import { InventoryRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { InventoryRepositoryImpl } from './repositories/inventory.repository';

@Module({
  providers: [
    {
      provide: InventoryRepository,
      useClass: InventoryRepositoryImpl,
    },

    PrismaService,
  ],
  exports: [InventoryRepository],
})
export class PrismaModule {}
