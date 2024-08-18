import {
  BadRequestException,
  Controller,
  HttpStatus,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';

import { User } from '@libs/domain';
import { RmqService, RpcExceptionFilter } from '@libs/shared';

import { RegisterDTO } from '@/root/auth/dtos/register.dto';
import { LoginDTO } from '@/root/auth/dtos/login.dto';

import { LoginCommand } from '@/auth/application/command/login/login.command';
import { RefreshCommand } from '@/auth/application/command/refresh/refresh.command';
import { RegisterUserCommand } from '@/auth/application/command/register/register-user.command';
import { LocalAuthGuard } from '@/auth/common/guards/local-auth.guard';
import { CurrentUser } from '@/auth/common/decorators/current.user.decorator';
import { JwtAuthGuard } from '@/auth/common/guards/jwt-auth.guard';

@Controller()
@UseFilters(new RpcExceptionFilter())
export class AuthController {
  constructor(
    private readonly command: CommandBus,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('register_user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleRegister(
    @Payload() dto: RegisterDTO,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    const { email, password, username } = dto;

    const command = new RegisterUserCommand(username, email, password);

    try {
      const newUser = await this.command.execute<RegisterUserCommand, User>(
        command,
      );

      this.rmqService.ack(context);

      return newUser;
    } catch (error) {
      throw new RpcException(
        new BadRequestException('Email already registered'),
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @EventPattern('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleLogin(
    @Payload() dto: LoginDTO,
    @Ctx() context: RmqContext,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = dto;

    const command = new LoginCommand(email, password);

    try {
      const token = await this.command.execute<
        LoginCommand,
        { access_token: string; refresh_token: string }
      >(command);

      this.rmqService.ack(context);

      return token;
    } catch (error) {
      throw new RpcException(
        new UnauthorizedException('Check your email/password'),
      );
    }
  }

  @EventPattern('refresh')
  async handleRefresh(
    @Payload() dto: any,
    @Ctx() context: RmqContext,
  ): Promise<{ access_token: string }> {
    const command = new RefreshCommand(dto);

    try {
      const token = await this.command.execute<
        RefreshCommand,
        { access_token: string }
      >(command);

      this.rmqService.ack(context);

      return token;
    } catch (error) {
      new RpcException(new UnauthorizedException('Refresh token expired'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: any) {
    return user;
  }
}
