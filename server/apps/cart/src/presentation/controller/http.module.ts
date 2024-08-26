import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { CartController } from './cart.controller';
import { ApplicationModule } from '@/cart/application/application.module';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [CartController],
  exports: [],
})
export class HttpModule {}
