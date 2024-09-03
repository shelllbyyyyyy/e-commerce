import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { INVENTORY_SERVICE } from '@libs/shared';
import { AddToInventoryDTO } from '@/root/inventory/dtos/add-to-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(INVENTORY_SERVICE) private readonly rmqService: ClientProxy,
  ) {}

  async addToInventory(
    param: string,
    request: AddToInventoryDTO,
    authentication: string,
  ) {
    try {
      const result = await lastValueFrom(
        this.rmqService
          .send('add_to_inventory', {
            param,
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
