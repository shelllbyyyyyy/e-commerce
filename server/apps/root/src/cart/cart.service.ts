import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { CART_SERVICE } from '@libs/shared';

import { AddToCartDTO } from './dtos/add-to-cart.dto';
import { UpdateCartDTO } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@Inject(CART_SERVICE) private readonly rmqService: ClientProxy) {}

  async addToCart(request: AddToCartDTO, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('add_to_cart', {
            request,
            access_token: authentication,
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

  async getCart(authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('get_cart', {
            access_token: authentication,
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

  async updateCartItem(
    param: string,
    request: UpdateCartDTO,
    authentication: string,
  ) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('update_cart_item', {
            param,
            request,
            access_token: authentication,
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
  async deleteCartItem(param: string, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('delete_cart_item', {
            param,
            access_token: authentication,
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
