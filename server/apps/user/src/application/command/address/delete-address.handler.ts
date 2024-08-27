import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { AddressService } from '@libs/domain';

import { DeleteAddressCommand } from './delete-address.command';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  implements ICommandHandler<DeleteAddressCommand, string>
{
  constructor(private readonly addressService: AddressService) {}
  async execute(command: DeleteAddressCommand): Promise<string> {
    const { id } = command;

    try {
      const deleteProfile = await this.addressService.delete(id);

      return deleteProfile;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
