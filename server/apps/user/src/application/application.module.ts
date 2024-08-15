import { Module } from '@nestjs/common';

import { AddressService, UserService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';

@Module({
  imports: [PersistenceModule],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,

    UserService,
    AddressService,
  ],
  exports: [...QueryHandlers, ...CommandHandlers, UserService, AddressService],
})
export class ApplicationModule {}
