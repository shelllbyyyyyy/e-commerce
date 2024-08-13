import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';

import { User } from '@libs/domain';
import { RmqService } from '@libs/shared';

import { RegisterDTO } from '@/root/auth/dtos/register.dto';
import { LoginDTO } from '@/root/auth/dtos/login.dto';
import { LoginCommand } from '@/auth/application/command/login/login.command';
import { RegisterUserCommand } from '@/auth/application/command/register/register-user.command';

@Controller()
export class AuthController {
  constructor(
    private readonly command: CommandBus,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('register_user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleRegister(
    @Body() dto: RegisterDTO,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    const { email, password, username } = dto;

    const command = new RegisterUserCommand(username, email, password);

    try {
      const newUser = await this.command.execute<RegisterUserCommand, User>(
        command,
      );

      this.rmqService.ack(context);

      if (!newUser) return;

      return newUser;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  @EventPattern('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleLogin(
    @Body() dto: LoginDTO,
    @Ctx() context: RmqContext,
  ): Promise<{ access_token: string }> {
    const { email, password } = dto;

    const command = new LoginCommand(email, password);

    try {
      const token = await this.command.execute<
        LoginCommand,
        { access_token: string }
      >(command);

      this.rmqService.ack(context);

      if (!token) return;

      return token;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
}
