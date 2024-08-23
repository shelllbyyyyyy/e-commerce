import { Module } from '@nestjs/common';

import { InventoryRepository, ProductVariantRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { InventoryRepositoryImpl } from './repositories/inventory.repository';
import { ProductVariantRepositoryImpl } from './repositories/variant.repository';

@Module({
  providers: [
    {
      provide: InventoryRepository,
      useClass: InventoryRepositoryImpl,
    },
    {
      provide: ProductVariantRepository,
      useClass: ProductVariantRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [InventoryRepository, ProductVariantRepository],
})
export class PrismaModule {}
