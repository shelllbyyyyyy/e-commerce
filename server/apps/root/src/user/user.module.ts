import { Module } from '@nestjs/common';

import { RmqModule, USER_SERVICE } from '@libs/shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';

@Module({
  imports: [
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [UserController, AddressController],
  providers: [UserService, AddressService],
})
export class UserModule {}
