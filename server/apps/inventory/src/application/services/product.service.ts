import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { PRODUCT_SERVICE } from '@libs/shared';
import { ProductVariant } from '@libs/domain';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}

  async getProductVariantById(param: string): Promise<ProductVariant> {
    try {
      const result = await lastValueFrom(
        this.rmqClient
          .send('get_product_variant_by_id', { param })
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
