import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';

import { InventoryRepository } from '../repositories/inventory.repository';
import { Inventory, InventoryStatus } from '../entities/inventory.entity';
import { VariantResponse } from '@libs/shared';

type UpdateStock = {
  productId: string;
  quantity: number;
  status: InventoryStatus;
};

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async addToInventory(variant: unknown, quantity: number): Promise<Inventory> {
    const { id, sku, price, imageUrl, label, productId } =
      variant as VariantResponse;

    const item = ProductVariant.create({
      id,
      sku,
      price,
      imageUrl,
      label,
      productId,
    });

    const add = Inventory.addToInventory({
      id: randomUUID(),
      quantity,
      item: item,
    });

    return await this.repository.addToInventory(add);
  }

  async getAllStockProduct(): Promise<Inventory[]> {
    return await this.repository.getAllStockProduct();
  }

  async getStockProduct(productId: string): Promise<Inventory> {
    return await this.repository.getStockProduct(productId);
  }

  async getStockProducts(productIds: string[]): Promise<Inventory[]> {
    return await this.repository.getStockProducts(productIds);
  }
  async updateStockProduct({
    productId,
    quantity,
    status,
  }: UpdateStock): Promise<Inventory> {
    const inventory = await this.repository.getStockProduct(productId);

    const update = inventory.updateStock({ quantity, status });
    return await this.repository.updateStockProduct(update);
  }
}
