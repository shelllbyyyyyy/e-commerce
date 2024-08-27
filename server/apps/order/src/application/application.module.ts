import { Module } from '@nestjs/common';

import { OrderService } from '@libs/domain';

import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { CommandHandlers } from './command';
import { QueryHandlers } from './queries';

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, OrderService],
  exports: [...QueryHandlers, ...CommandHandlers, OrderService],
})
export class ApplicationModule {}
