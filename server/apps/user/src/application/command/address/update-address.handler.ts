import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Address, AddressService } from '@libs/domain';

import { UpdateAddressCommand } from './update-address.command';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  implements ICommandHandler<UpdateAddressCommand, Address>
{
  constructor(private readonly addressService: AddressService) {}
  async execute(command: UpdateAddressCommand): Promise<Address> {
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
      const updateProfile = await this.addressService.update({
        city,
        country_code,
        first_name,
        last_name,
        mapUrl,
        phone_number,
        postal_code,
        state,
        street,
        id,
      });

      return updateProfile;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
