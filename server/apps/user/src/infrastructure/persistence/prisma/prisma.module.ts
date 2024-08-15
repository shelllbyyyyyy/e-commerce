import { Module } from '@nestjs/common';

import { AddressRepository, UserRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { UserRepositoryImpl } from './repositories/user-repository';
import { AddressRepositoryImpl } from './repositories/address-repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: AddressRepository,
      useClass: AddressRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [UserRepository, AddressRepository],
})
export class PrismaModule {}
