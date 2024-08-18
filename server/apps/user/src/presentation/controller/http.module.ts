import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { ApplicationModule } from '@/user/application/application.module';
import { UserController } from './user.controller';
import { AddressController } from './address.controller';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [UserController, AddressController],
  exports: [],
})
export class HttpModule {}
