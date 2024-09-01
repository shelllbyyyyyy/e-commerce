import { Module } from '@nestjs/common';

import { BillingRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { BillingRepositoryImpl } from './repositories/billing.repository';

@Module({
  providers: [
    { provide: BillingRepository, useClass: BillingRepositoryImpl },
    PrismaService,
  ],
  exports: [BillingRepository],
})
export class PrismaModule {}
