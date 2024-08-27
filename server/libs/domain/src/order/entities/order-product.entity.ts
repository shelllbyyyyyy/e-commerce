import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';
import { Price } from '@libs/domain/product/values-object/price';
import { Quantity } from '@libs/domain/product/values-object/quantity';

export class OrderProduct {
  constructor(
    private readonly id: string,
    private readonly orderId: string,
    private readonly item: ProductVariant,
    private readonly quantity: Quantity,
    private readonly price: Price,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getOrderId(): string {
    return this.orderId;
  }

  getItem(): ProductVariant {
    return this.item;
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getPrice(): Price {
    return this.price;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static createOrderProduct({
    id,
    orderId,
    item,
    quantity,
    price,
  }: {
    id: string;
    orderId: string;
    item: ProductVariant;
    quantity: number;
    price: number;
  }): OrderProduct {
    return new OrderProduct(
      id,
      orderId,
      item,
      new Quantity(quantity),
      new Price(price),
    );
  }
}
