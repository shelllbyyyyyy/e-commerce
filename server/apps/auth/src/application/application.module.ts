import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  BcryptService,
  EmailService,
  MailerModule,
  RmqModule,
  USER_SERVICE,
} from '@libs/shared';

import { CommandHandlers } from './command';

import { AuthService } from './service/auth.service';
import { QueryHandlers } from './queries';

@Module({
  imports: [MailerModule, RmqModule.register({ name: USER_SERVICE })],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    JwtService,
    BcryptService,
    AuthService,
    EmailService,
  ],
  exports: [
    ...CommandHandlers,
    ...QueryHandlers,
    BcryptService,
    AuthService,
    EmailService,
  ],
})
export class ApplicationModule {}
