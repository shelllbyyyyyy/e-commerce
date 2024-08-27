import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { User, UserService } from '@libs/domain';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, User>
{
  constructor(private readonly service: UserService) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { email, password, username } = command;

    try {
      return await this.service.save({
        email,
        password,
        username,
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
