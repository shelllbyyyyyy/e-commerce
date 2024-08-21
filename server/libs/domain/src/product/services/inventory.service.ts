import { Injectable } from '@nestjs/common';

import { InventoryRepository } from '../repositories/inventory.repository';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async getAllStockProduct(): Promise<Inventory[]> {
    return await this.repository.getAllStockProduct();
  }

  async getStockProduct(productId: string): Promise<Inventory> {
    return await this.repository.getStockProduct(productId);
  }
  async updateStockProduct(data: Inventory): Promise<Inventory> {
    return await this.repository.updateStockProduct(data);
  }
}
