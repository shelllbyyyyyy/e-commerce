import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';
import { randomUUID } from 'crypto';

type NewProduct = {
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  description: string;
  category: string;
  sku: string;
  label: string;
};

type UpdateProduct = {
  name: string;
  description: string;
  price: number;
  slug: string;
};

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async save({
    category,
    description,
    imageUrl,
    name,
    price,
    slug,
    label,
    sku,
  }: NewProduct): Promise<Product> {
    const product = Product.create({
      id: randomUUID(),
      name,
      price,
      imageUrl: [imageUrl],
      slug,
      description,
      category,
      sku,
      label,
    });

    return await this.repository.save(product);
  }

  async findById(id: string): Promise<Product> {
    return await this.repository.findById(id);
  }

  async findBySlug(slug: string): Promise<Product> {
    return await this.repository.findBySlug(slug);
  }

  async update({
    description,
    name,
    price,
    slug,
  }: UpdateProduct): Promise<Product> {
    const product = await this.repository.findBySlug(slug);

    const update = product.updateProduct({ name, description, price });
    return await this.repository.update(update);
  }

  async delete(slug: string): Promise<boolean> {
    return await this.repository.delete(slug);
  }
}
