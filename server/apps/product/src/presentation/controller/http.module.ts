import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, ConvertBufferService, RmqModule } from '@libs/shared';

import { ApplicationModule } from '@/product/application/application.module';
import { ProductController } from './product.controller';
import { VariantController } from './variant.controller';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [ConvertBufferService],
  controllers: [ProductController, VariantController],
  exports: [],
})
export class HttpModule {}
