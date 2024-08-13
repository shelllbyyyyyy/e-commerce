import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

import { User, UserService } from '@libs/domain';
import { BcryptService } from '@libs/shared';

import { RegisterUserCommand } from '../register-user.command';
import { UnprocessableEntityException } from '@nestjs/common';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand, User>
{
  constructor(
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
    private readonly event: EventBus,
  ) {
    console.log('RegisterUserHandler instantiated');
  }

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, password, username } = command;

    const existingUser = await this.service.findByEmail(email);
    if (existingUser) {
      throw new UnprocessableEntityException('Email already registered');
    }

    const id = randomUUID();

    const hashPassword = await this.bcrypt.hashPassword(password);

    const newUser = new User(id, username, email, hashPassword);

    const register = await this.service.save(newUser);

    this.event.publish(register).commit();

    return register;
  }
}
