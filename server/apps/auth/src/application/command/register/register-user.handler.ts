import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { User } from '@libs/domain';
import { BcryptService, EmailService } from '@libs/shared';

import { RegisterUserCommand } from './register-user.command';
import { AuthService } from '../../service/auth.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand, User>
{
  constructor(
    private readonly authService: AuthService,
    private readonly bcrypt: BcryptService,
    private readonly sendEmail: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, password, username } = command;

    try {
      const existingUser = await this.authService.checkUser(email);

      if (existingUser) {
        throw new UnprocessableEntityException('Email already registered');
      }

      const hashPassword = await this.bcrypt.hashPassword(password);

      const register = await this.authService.register({
        email,
        username,
        password: hashPassword,
      });

      if (register) {
        const payload = { sub: register.id };

        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
          secret: this.configService.get<string>('VERIFY_TOKEN_SECRET'),
        });
        await this.sendEmail.sendUserWelcome(register, token);
      }

      return register;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Email already been registered'),
      );
    }
  }
}
