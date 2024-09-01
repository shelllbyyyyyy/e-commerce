import { Module } from '@nestjs/common';

import { OrderRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { OrderRepositoryImpl } from './repositories/order.repository';

@Module({
  providers: [
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [OrderRepository],
})
export class PrismaModule {}
