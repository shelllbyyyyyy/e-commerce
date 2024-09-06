import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { RefreshModule } from './midleware/midleware.module';

@Module({
  imports: [
    RefreshModule,
    AuthModule,
    UserModule,
    SwaggerModule,
    ProductModule,
    InventoryModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
