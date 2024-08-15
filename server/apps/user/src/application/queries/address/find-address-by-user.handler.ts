import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Address, AddressService } from '@libs/domain';

import { FindAddressByUserQuery } from './find-address-by-user.query';

@QueryHandler(FindAddressByUserQuery)
export class FindAddressByUserHandler
  implements IQueryHandler<FindAddressByUserQuery, Address[]>
{
  constructor(private readonly service: AddressService) {}
  async execute(query: FindAddressByUserQuery): Promise<Address[]> {
    const { userId } = query;
    try {
      const address = await this.service.findByUserId(userId);

      if (address.length === 0) throw new NotFoundException();

      return address;
    } catch (error) {
      console.log(error);
    }
  }
}
