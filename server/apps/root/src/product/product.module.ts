import { Module } from '@nestjs/common';

import { ConvertBufferService, PRODUCT_SERVICE, RmqModule } from '@libs/shared';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    RmqModule.register({
      name: PRODUCT_SERVICE,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ConvertBufferService],
})
export class ProductModule {}
