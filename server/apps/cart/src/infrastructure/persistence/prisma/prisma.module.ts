import { Module } from '@nestjs/common';

import { CartRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { CartRepositoryImpl } from './repositories/cart.repository';

@Module({
  providers: [
    {
      provide: CartRepository,
      useClass: CartRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [CartRepository],
})
export class PrismaModule {}
