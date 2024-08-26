import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';
import { Quantity } from '@libs/domain/product/values-object/quantity';

export class CartItem {
  constructor(
    private readonly id: string,
    private readonly cartId: string,
    private readonly item: ProductVariant,
    private readonly quantity: Quantity,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.cartId = cartId;
    this.item = item;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getCartId(): string {
    return this.cartId;
  }

  getItem(): ProductVariant {
    return this.item;
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateQuantity(quantity: number): CartItem {
    return new CartItem(
      this.id,
      this.cartId,
      this.item,
      new Quantity(quantity),
    );
  }

  static newItem({
    id,
    cartId,
    item,
    quantity,
  }: {
    id: string;
    cartId: string;
    item: ProductVariant;
    quantity: number;
  }): CartItem {
    return new CartItem(id, cartId, item, new Quantity(quantity));
  }
}
