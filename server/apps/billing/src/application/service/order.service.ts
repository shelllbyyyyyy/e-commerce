import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { ORDER_SERVICE } from '@libs/shared';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_SERVICE) private readonly rmqClient: ClientProxy) {}

  async getOrderById(param: string, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_order_payment', {
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
