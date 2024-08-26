import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SwaggerModule,
    ProductModule,
    InventoryModule,
    CartModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
