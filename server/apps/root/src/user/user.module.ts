import { Module } from '@nestjs/common';

import { ConvertBufferService, RmqModule, USER_SERVICE } from '@libs/shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';

@Module({
  imports: [
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [UserController, AddressController],
  providers: [UserService, AddressService, ConvertBufferService],
})
export class UserModule {}
