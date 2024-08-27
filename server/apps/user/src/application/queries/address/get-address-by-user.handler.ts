import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Address, AddressService } from '@libs/domain';

import { GetAddressByUserQuery } from './get-address-by-user.query';

@QueryHandler(GetAddressByUserQuery)
export class GetAddressByUserHandler
  implements IQueryHandler<GetAddressByUserQuery, Address[]>
{
  constructor(private readonly service: AddressService) {}
  async execute(query: GetAddressByUserQuery): Promise<Address[]> {
    const { userId } = query;
    try {
      const address = await this.service.findByUserId(userId);

      if (address.length === 0) {
        throw new NotFoundException("You don't have any address");
      }

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
