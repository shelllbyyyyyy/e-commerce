import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '@libs/shared';
import { UserService } from '@libs/domain';

// import { CommandHandlers } from './command/handlers';
// import { QueryHandlers } from './queries/handlers';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    // CqrsModule,
    PersistenceModule,
  ],
  providers: [
    // ...CommandHandlers,
    // ...QueryHandlers,
    JwtService,
    BcryptService,
    AuthService,
    UserService,
  ],
  exports: [
    // ...CommandHandlers,
    // ...QueryHandlers,
    UserService,
    AuthService,
  ],
})
export class ApplicationModule {}
