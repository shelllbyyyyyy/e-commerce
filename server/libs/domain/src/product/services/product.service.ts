import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async save(data: Product): Promise<Product> {
    return await this.repository.save(data);
  }

  async findById(id: string): Promise<Product> {
    return await this.repository.findById(id);
  }

  async findBySlug(slug: string): Promise<Product> {
    return await this.repository.findBySlug(slug);
  }

  async update(data: Product): Promise<Product> {
    return await this.repository.update(data);
  }

  async delete(slug: string): Promise<boolean> {
    return await this.repository.delete(slug);
  }
}
