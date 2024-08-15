import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule, RmqModule } from '@libs/shared';

import { UserController } from './user.controller';
import { ApplicationModule } from '@/user/application/application.module';

@Module({
  imports: [ApplicationModule, RmqModule, CqrsModule, AuthModule],
  providers: [],
  controllers: [UserController],
  exports: [],
})
export class HttpModule {}
