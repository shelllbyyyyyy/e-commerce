import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { ORDER_SERVICE } from '@libs/shared';
import { Order } from '@libs/domain';

import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { ChargeDTO } from './dtos/charge.dto';
import { MidtransNotificationDto } from './dtos/notification.dto';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_SERVICE) private readonly rmqClient: ClientProxy) {}

  async createOrder(
    request: CreateOrderDTO,
    authentication: string,
  ): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('create_order', {
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

  async payOrder(request: ChargeDTO, authentication: string): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('charge', {
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

  async getOrder(authentication: string): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_order', {
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

  async getOrderById(param: string, authentication: string): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_order_by_id', {
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

  async updateOrder(
    param: string,
    request: UpdateOrderDTO,
    authentication: string,
  ): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('update_order', {
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

  async updateBilling(request: MidtransNotificationDto): Promise<Order> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('handle_notification', {
            request,
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
