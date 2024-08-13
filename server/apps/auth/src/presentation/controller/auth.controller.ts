import { Body, Controller, HttpStatus } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';

import { User } from '@libs/domain';
import { RmqService } from '@libs/shared';

import { AuthService } from '@/auth/application/services/auth.service';

import { RegisterDTO } from '@/root/auth/dtos/register.dto';
import { ApiResponse } from '@/root/auth/dtos/api-response.dto';
import { LoginDTO } from '@/root/auth/dtos/login.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('register_user')
  async handleRegister(
    @Body() dto: RegisterDTO,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    const { email, password, username } = dto;

    const newUser = await this.service.register(username, email, password);

    this.rmqService.ack(context);

    if (!newUser) return;

    return newUser;
  }

  @EventPattern('login')
  async handleLogin(
    @Body() dto: LoginDTO,
    @Ctx() context: RmqContext,
  ): Promise<{ access_token: string }> {
    const { email, password } = dto;

    const token = await this.service.login(email, password);

    this.rmqService.ack(context);

    if (!token) return;

    return token;
  }
}
