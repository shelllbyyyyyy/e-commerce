import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { USER_SERVICE } from '@libs/shared';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private rmqClient: ClientProxy) {}

  async getUser(authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_user', {
            authorization: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async getAddress(param: string, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_address', {
            param,
            authorization: authentication,
          })
          .pipe(
            catchError((error) => throwError(() => new RpcException(error))),
          ),
      );
      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }
}
