import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ConfigService } from '@nestjs/config';

import { ProductService, ProductVariantService } from '@libs/domain';
import { INVENTORY_SERVICE, RmqModule, UploadService } from '@libs/shared';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';
import { InventoryService } from './service/inventory.service';

@Module({
  imports: [
    PersistenceModule,
    CloudinaryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        cloud_name: configService.get('CLOUDINARY_NAME'),
        api_key: configService.get('CLOUDINARY_API_KEY'),
        api_secret: configService.get('CLOUDINARY_API_SECRET'),
      }),
      inject: [ConfigService],
    }),
    RmqModule.register({
      name: INVENTORY_SERVICE,
    }),
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    ProductService,
    ProductVariantService,
    UploadService,
    InventoryService,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    ProductService,
    ProductVariantService,
    UploadService,
    InventoryService,
  ],
})
export class ApplicationModule {}
