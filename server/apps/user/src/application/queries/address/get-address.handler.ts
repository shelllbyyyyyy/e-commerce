import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Address, AddressService } from '@libs/domain';

import { GetAddressQuery } from './get-address.query';

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(
          new NotFoundException("You don't have any address"),
        );
      }
    }
  }
}
