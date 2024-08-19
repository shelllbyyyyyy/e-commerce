import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService, EmailService, MailerModule } from '@libs/shared';
import { UserService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';

import { AuthService } from './service/auth.service';
import { QueryHandlers } from './queries';

@Module({
  imports: [PersistenceModule, MailerModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    JwtService,
    BcryptService,
    UserService,
    AuthService,
    EmailService,
  ],
  exports: [
    ...CommandHandlers,
    ...QueryHandlers,
    UserService,
    BcryptService,
    AuthService,
    EmailService,
  ],
})
export class ApplicationModule {}
