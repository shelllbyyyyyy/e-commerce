import { ProductVariant } from './product-variant.entity';

export enum InventoryStatus {
  AVAILABLE = 'Available',
  ON_ORDER = 'On Order',
  RESERVED = 'Reserved',
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

  updateStock({
    quantity,
    status,
  }: {
    quantity: number;
    status: InventoryStatus;
  }): Inventory {
    return new Inventory(this.id, quantity, status, this.item);
  }
}
