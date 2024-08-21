import { Injectable } from '@nestjs/common';

import { Inventory } from '../entities/inventory.entity';

@Injectable()
export abstract class InventoryRepository {
  abstract addToInventory(
    productId: string,
    quantity: number,
  ): Promise<Inventory>;
  abstract getAllStockProduct(): Promise<Inventory[]>;
  abstract getStockProduct(productId: string): Promise<Inventory>;
  abstract updateStockProduct(data: Inventory): Promise<Inventory>;
}
