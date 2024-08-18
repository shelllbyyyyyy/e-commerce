import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Address, AddressService } from '@libs/domain';

import { GetAddressQuery } from './get-address.query';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetAddressQuery)
export class GetAddressHandler
  implements IQueryHandler<GetAddressQuery, Address>
{
  constructor(private readonly service: AddressService) {}
  async execute(query: GetAddressQuery): Promise<Address> {
    const { id } = query;
    try {
      const address = await this.service.findById(id);

      if (!address) throw new NotFoundException();

      return address;
    } catch (error) {
      throw new RpcException(new NotFoundException('Address not found'));
    }
  }
}
