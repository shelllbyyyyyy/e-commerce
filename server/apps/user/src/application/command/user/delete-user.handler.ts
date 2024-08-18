import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserService } from '@libs/domain';

import { DeleteUserCommand } from './delete-user.command';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, boolean>
{
  constructor(private readonly service: UserService) {}

  async execute(command: DeleteUserCommand): Promise<boolean> {
    const { id } = command;

    try {
      await this.service.deleteById(id);

      return true;
    } catch (error) {
      new RpcException(error);
    }
  }
}
