import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { InventoryRepository } from '../repositories/inventory.repository';
import { Inventory, InventoryStatus } from '../entities/inventory.entity';
import { ProductVariantRepository } from '../../product/repositories/product-variant.repository';

type UpdateStock = {
  productId: string;
  quantity: number;
  status: InventoryStatus;
};

@Injectable()
export class InventoryService {
  constructor(
    private readonly repository: InventoryRepository,
    private readonly variantRepository: ProductVariantRepository,
  ) {}

  async addToInventory(
    productId: string,
    quantity: number,
  ): Promise<Inventory> {
    const vairant = await this.variantRepository.findById(productId);

    const add = Inventory.addToInventory({
      id: randomUUID(),
      quantity,
      item: vairant,
    });

    return await this.repository.addToInventory(add);
  }

  async getAllStockProduct(): Promise<Inventory[]> {
    return await this.repository.getAllStockProduct();
  }

  async getStockProduct(productId: string): Promise<Inventory> {
    return await this.repository.getStockProduct(productId);
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
