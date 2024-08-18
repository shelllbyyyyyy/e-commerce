import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddressService, UserService } from '@libs/domain';

import { DeleteAddressCommand } from './delete-address.command';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  implements ICommandHandler<DeleteAddressCommand, string>
{
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}
  async execute(command: DeleteAddressCommand): Promise<string> {
    const { id } = command;

    try {
      const deleteProfile = await this.addressService.delete(id);

      return deleteProfile;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
