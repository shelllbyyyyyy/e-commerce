import { Module } from '@nestjs/common';

import { UserRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { UserRepositoryImpl } from './repositories/user-repository';

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
