import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User, UserService } from '@libs/domain';

import { UpdateUserCommand } from './update-user.command';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, User>
{
  constructor(private readonly service: UserService) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, display_name, phone_number, profile_picture } = command;

    try {
      const user = await this.service.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const data = user.updateUser({
        display_name,
        phone_number,
        profile_picture,
      });

      const update = await this.service.updateById(data);

      if (!update) {
        throw new BadRequestException('something wrong');
      }

      return update;
    } catch (error) {
      new RpcException(error);
    }
  }
}
