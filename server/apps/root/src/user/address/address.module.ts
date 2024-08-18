import { Module } from '@nestjs/common';

import { RmqModule, USER_SERVICE } from '@libs/shared';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
