import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewUserCommand } from './new-user.command';
import { User, UserService } from '@libs/domain';
import { RpcException } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

@CommandHandler(NewUserCommand)
export class NewUserHandler implements ICommandHandler<NewUserCommand, User> {
  constructor(private readonly service: UserService) {}

  async execute(command: NewUserCommand): Promise<User> {
    const {
      display_name,
      email,
      id,
      isVerified,
      password,
      profile_picture,
      username,
    } = command;

    try {
      const newUser = new User(
        id,
        username,
        email,
        password,
        isVerified,
        display_name,
        profile_picture,
      );
      return this.service.create(newUser);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
