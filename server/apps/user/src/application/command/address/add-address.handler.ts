import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Address, AddressService } from '@libs/domain';

import { AddAddressCommand } from './add-address.command';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  implements ICommandHandler<AddAddressCommand, Address>
{
  constructor(private readonly addressService: AddressService) {}
  async execute(command: AddAddressCommand): Promise<Address> {
    const {
      id,
      first_name,
      last_name,
      city,
      country_code,
      phone_number,
      postal_code,
      state,
      street,
      mapUrl,
    } = command;

    try {
      return await this.addressService.save({
        first_name,
        last_name,
        phone_number,
        street,
        city,
        state,
        postal_code,
        country_code,
        userId: id,
        mapUrl,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
