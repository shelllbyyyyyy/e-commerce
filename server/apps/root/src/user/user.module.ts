import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RmqModule, USER_SERVICE } from '@libs/shared';

@Module({
  imports: [
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
