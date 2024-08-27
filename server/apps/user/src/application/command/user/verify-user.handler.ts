import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserService } from '@libs/domain';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from './verify-user.command';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler
  implements ICommandHandler<VerifyUserCommand, boolean>
{
  constructor(private readonly service: UserService) {}

  async execute(command: VerifyUserCommand): Promise<boolean> {
    const { userId } = command;

    try {
      await this.service.verifyUser(userId);

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('Token expired'));
      }
    }
  }
}
