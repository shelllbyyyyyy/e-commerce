import { ProductVariant } from './product-variant.entity';

export enum InventoryStatus {
  AVAILABLE,
  ON_ORDER,
  RESERVED,
}

export class Inventory {
  constructor(
    private readonly id: string,
    private readonly quantity: number,
    private readonly status: InventoryStatus,
    private readonly item: ProductVariant,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.status = status;
    this.item = item;
  }

  getId(): string {
    return this.id;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getStatus(): InventoryStatus {
    return this.status;
  }

  getItem(): ProductVariant {
    return this.item;
  }
}
