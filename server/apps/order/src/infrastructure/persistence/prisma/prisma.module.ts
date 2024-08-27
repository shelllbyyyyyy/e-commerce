import { Module } from '@nestjs/common';

import { OrderRepository, ProductVariantRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { ProductVariantRepositoryImpl } from './repositories/variant.repository';
import { OrderRepositoryImpl } from './repositories/order.repository';

@Module({
  providers: [
    {
      provide: ProductVariantRepository,
      useClass: ProductVariantRepositoryImpl,
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [ProductVariantRepository, OrderRepository],
})
export class PrismaModule {}
