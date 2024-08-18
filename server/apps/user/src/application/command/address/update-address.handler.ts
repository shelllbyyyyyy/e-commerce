import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Address, AddressService } from '@libs/domain';

import { UpdateAddressCommand } from './update-address.command';
import { RpcException } from '@nestjs/microservices';

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

    const address = await this.addressService.findById(id);
    if (!address) throw new NotFoundException('User not found');

    const newAddress = address.updateAddress({
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      mapUrl,
    });
    try {
      const updateProfile = await this.addressService.update(newAddress);

      return updateProfile;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
