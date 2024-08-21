import { Module } from '@nestjs/common';

import { ProductRepository, ProductVariantRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { ProductRepositoryImpl } from './repositories/product.repository';
import { ProductVariantRepositoryImpl } from './repositories/variant.repository';

@Module({
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: ProductVariantRepository,
      useClass: ProductVariantRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [ProductRepository, ProductVariantRepository],
})
export class PrismaModule {}
