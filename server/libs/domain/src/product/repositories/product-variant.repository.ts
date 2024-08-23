import { Injectable } from '@nestjs/common';

import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export abstract class ProductVariantRepository {
  abstract save(data: ProductVariant): Promise<ProductVariant>;
  abstract findById(id: string): Promise<ProductVariant>;
  abstract update(data: ProductVariant): Promise<ProductVariant>;
  abstract delete(id: string): Promise<boolean>;
}
