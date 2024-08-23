import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { INVENTORY_SERVICE } from '@libs/shared';

import { UpdateInventoryDTO } from './dtos/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(INVENTORY_SERVICE) private readonly rmqService: ClientProxy,
  ) {}

  async getAllStockProduct(authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('get_all_stock_product', {
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

  async getStockProduct(param: string, authentication: string) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('get_stock_product', {
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

  async updateStockProduct(
    param: string,
    request: UpdateInventoryDTO,
    authentication: string,
  ) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('update_stock_product', {
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
}
