import { Module } from '@nestjs/common';

import {
  CartRepository,
  InventoryRepository,
  ProductVariantRepository,
} from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { ProductVariantRepositoryImpl } from './repositories/variant.repository';
import { CartRepositoryImpl } from './repositories/cart.repository';
import { InventoryRepositoryImpl } from './repositories/inventory.repository';

@Module({
  providers: [
    {
      provide: CartRepository,
      useClass: CartRepositoryImpl,
    },
    {
      provide: ProductVariantRepository,
      useClass: ProductVariantRepositoryImpl,
    },
    {
      provide: InventoryRepository,
      useClass: InventoryRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [ProductVariantRepository, CartRepository, InventoryRepository],
})
export class PrismaModule {}
