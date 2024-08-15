import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { User } from '@libs/domain';
import { AUTH_SERVICE } from '@libs/shared';

import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private rmqClient: ClientProxy) {}

  async register(request: RegisterDTO): Promise<User> {
    try {
      return await lastValueFrom(this.rmqClient.send('register_user', request));
    } catch (error) {
      console.log(error);
    }
  }

  async login(
    request: LoginDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      return await lastValueFrom(this.rmqClient.send('login', request));
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(request: any): Promise<{ access_token: string }> {
    try {
      return await lastValueFrom(this.rmqClient.send('refresh', request));
    } catch (error) {
      console.log(error);
    }
  }
}
