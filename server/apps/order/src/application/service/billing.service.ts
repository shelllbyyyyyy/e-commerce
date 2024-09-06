import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { BILLING_SERVICE } from '@libs/shared';
import { ChargeDTO } from '@/root/order/dtos/charge.dto';
import { MidtransNotificationDto } from '@/root/order/dtos/notification.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject(BILLING_SERVICE) private readonly rmqService: ClientProxy,
  ) {}

  async handleCharge(request: ChargeDTO, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
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

  async handleNotification(request: {
    transaction_status: string;
    order_id: string;
  }) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('update_billing', {
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
