import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { CART_SERVICE } from '@libs/shared';

@Injectable()
export class CartService {
  constructor(@Inject(CART_SERVICE) private readonly rmqService: ClientProxy) {}

  async getCartItems(
    request: { cartItemId: string[] },
    authentication: string,
  ) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('get_cart_items', {
            request,
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

  async deleteCartItems(
    request: { cartItemId: string[] },
    authentication: string,
  ) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .emit('delete_cart_items', {
            request,
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
