import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { User, UserService } from '@libs/domain';
import { BcryptService, EmailService } from '@libs/shared';

import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand, User>
{
  constructor(
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
    private readonly sendEmail: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, password, username } = command;

    const existingUser = await this.service.findByEmail(email);
    if (existingUser) {
      throw new UnprocessableEntityException('Email already registered');
    }

    try {
      const id = randomUUID();

      const hashPassword = await this.bcrypt.hashPassword(password);

      const newUser = new User(id, username, email, hashPassword, false);

      const register = await this.service.save(newUser);

      if (register) {
        const payload = { sub: register.getId() };

        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
          secret: this.configService.get<string>('VERIFY_TOKEN_SECRET'),
        });
        await this.sendEmail.sendUserWelcome(newUser, token);
      }

      return register;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Email already been registered'),
      );
    }
  }
}
