import { Injectable } from '@nestjs/common';

import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(private readonly repository: ProductVariantRepository) {}

  async save(productId: string, data: ProductVariant): Promise<ProductVariant> {
    return await this.repository.save(productId, data);
  }

  async findById(id: string): Promise<ProductVariant> {
    return await this.repository.findById(id);
  }

  async update(data: ProductVariant): Promise<ProductVariant> {
    return await this.repository.update(data);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
