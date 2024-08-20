import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';

@Injectable()
export abstract class ProductRepository {
  abstract save(data: Product): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product>;
  abstract findBySlug(slug: string): Promise<Product>;
  abstract update(data: Product): Promise<Product>;
  abstract delete(slug: string): Promise<boolean>;
}
