import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Address, AddressService } from '@libs/domain';

import { FindAddressQuery } from './find-address.query';

@QueryHandler(FindAddressQuery)
export class FindAddressHandler
  implements IQueryHandler<FindAddressQuery, Address>
{
  constructor(private readonly service: AddressService) {}
  async execute(query: FindAddressQuery): Promise<Address> {
    const { id } = query;
    try {
      const address = await this.service.findById(id);

      if (!address) throw new NotFoundException();

      return address;
    } catch (error) {
      console.log(error);
    }
  }
}
