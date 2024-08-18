import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { User } from '@libs/domain';
import { AUTH_SERVICE } from '@libs/shared';

import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private rmqClient: ClientProxy) {}

  async register(request: RegisterDTO): Promise<User> {
    try {
      return await lastValueFrom(
        this.rmqClient
          .send('register_user', request)
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async login(
    request: LoginDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      return await lastValueFrom(
        this.rmqClient
          .send('login', request)
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async refresh(request: any): Promise<{ access_token: string }> {
    try {
      return await lastValueFrom(
        this.rmqClient
          .send('refresh', request)
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }
}
