import { Module } from '@nestjs/common';

import { AddressService, UserService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';
import { UploadService } from '@libs/shared';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ConfigService } from '@nestjs/config';

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
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    UploadService,
    UserService,
    AddressService,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
    UserService,
    AddressService,
    UploadService,
  ],
})
export class ApplicationModule {}
