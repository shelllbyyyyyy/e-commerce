import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Address, AddressService, UserService } from '@libs/domain';

import { AddAddressCommand } from './add-address.command';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  implements ICommandHandler<AddAddressCommand, Address>
{
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}
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

    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    const _id = randomUUID();
    const newAddress = new Address(
      _id,
      first_name,
      last_name,
      phone_number,
      street,
      city,
      state,
      postal_code,
      country_code,
      user.getId(),
      mapUrl,
    );

    try {
      return await this.addressService.save(user.getId(), newAddress);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
