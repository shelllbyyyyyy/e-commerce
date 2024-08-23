import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';
import { User } from '@libs/domain/user/entities/user.entity';

export class Cart {
  constructor(
    private readonly id: string,
    private readonly quantity: number,
    private readonly item: ProductVariant,
    private readonly user: User,
    private readonly order?: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
    private readonly checkoutAt?: Date,
    private readonly deletedAt?: Date,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.item = item;
    this.user = user;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.checkoutAt = checkoutAt;
    this.deletedAt = deletedAt;
  }

  getId(): string {
    return this.id;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getItem(): ProductVariant {
    return this.item;
  }

  getUser(): User {
    return this.user;
  }

  getOrder(): string {
    return this.order;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getCheckoutAt(): Date {
    return this.checkoutAt;
  }

  getDeletedAT(): Date {
    return this.deletedAt;
  }
}
