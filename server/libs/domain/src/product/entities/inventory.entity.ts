import { Quantity } from '../values-object/quantity';
import { ProductVariant } from './product-variant.entity';

export enum InventoryStatus {
  AVAILABLE,
  ON_ORDER,
  RESERVED,
}

export class Inventory {
  constructor(
    private readonly id: string,
    private readonly quantity: Quantity,
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

  getQuantity(): Quantity {
    return this.quantity;
  }

  getStatus(): InventoryStatus {
    return this.status;
  }

  getItem(): ProductVariant {
    return this.item;
  }

  static addToInventory({
    id,
    quantity,
    item,
  }: {
    id: string;
    quantity: number;
    item: ProductVariant;
  }): Inventory {
    const status =
      quantity == 0 || quantity < 1
        ? InventoryStatus.RESERVED
        : InventoryStatus.AVAILABLE;
    return new Inventory(id, new Quantity(quantity), status, item);
  }

  updateStock({
    quantity,
    status,
  }: {
    quantity: number;
    status: InventoryStatus;
  }): Inventory {
    return new Inventory(
      this.id,
      quantity ? new Quantity(quantity) : this.quantity,
      status,
      this.item,
    );
  }
}
