import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { INVENTORY_SERVICE } from '@libs/shared';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(INVENTORY_SERVICE) private readonly rmqService: ClientProxy,
  ) {}

  async getStockProduct(param: string, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('get_stock_product', {
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
