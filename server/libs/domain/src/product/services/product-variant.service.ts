import { Injectable } from '@nestjs/common';

import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { ProductVariant } from '../entities/product-variant.entity';
import { ProductRepository } from '../repositories/product.repository';
import { randomUUID } from 'crypto';

type NewVariant = {
  sku: string;
  price: number;
  imageUrl: string;
  label: string;
  slug: string;
};

type UpdateVariant = {
  id: string;
  sku?: string;
  price?: number;
  imageUrl?: string;
  label?: string;
};

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly repository: ProductVariantRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async save({
    imageUrl,
    label,
    price,
    slug,
    sku,
  }: NewVariant): Promise<ProductVariant> {
    const product = await this.productRepository.findBySlug(slug);

    const variant = ProductVariant.create({
      id: randomUUID(),
      sku,
      price,
      imageUrl,
      label,
      productId: product.getId(),
    });
    return await this.repository.save(variant);
  }

  async findById(id: string): Promise<ProductVariant> {
    return await this.repository.findById(id);
  }

  async update({
    id,
    imageUrl,
    label,
    price,
    sku,
  }: UpdateVariant): Promise<ProductVariant> {
    const product = await this.repository.findById(id);

    const update = product.updateVariant({ label, sku, imageUrl, price });

    return await this.repository.update(update);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
