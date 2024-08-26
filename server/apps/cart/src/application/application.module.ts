import { Module } from '@nestjs/common';

import { CartService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, CartService],
  exports: [...QueryHandlers, ...CommandHandlers, CartService],
})
export class ApplicationModule {}
