import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@libs/shared';
import { UserService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';

import { AuthService } from './service/auth.service';

@Module({
  imports: [PersistenceModule],
  providers: [
    ...CommandHandlers,
    JwtService,
    BcryptService,
    UserService,
    AuthService,
  ],
  exports: [...CommandHandlers, UserService, BcryptService, AuthService],
})
export class ApplicationModule {}
