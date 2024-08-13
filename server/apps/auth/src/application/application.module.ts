import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@libs/shared';
import { UserService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...CommandHandlers, JwtService, BcryptService, UserService],
  exports: [...CommandHandlers, UserService, BcryptService],
})
export class ApplicationModule {}
