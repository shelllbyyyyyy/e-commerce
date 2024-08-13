import { Module } from '@nestjs/common';

import { UserRepository } from '@libs/domain';

import { UserRepositoryImpl } from './repositories/user-repository';
import { PrismaService } from '@libs/shared';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [UserRepository],
})
export class PrismaModule {}
