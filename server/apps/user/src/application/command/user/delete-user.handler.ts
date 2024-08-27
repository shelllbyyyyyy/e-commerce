import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { UserService } from '@libs/domain';

import { DeleteUserCommand } from './delete-user.command';

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
