import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { ApplicationModule } from '@/inventory/application/application.module';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [InventoryController],
  exports: [],
})
export class HttpModule {}
