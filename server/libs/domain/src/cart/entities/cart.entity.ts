import { CartItem } from './cart-item.entity';

export class Cart {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private cartItem: CartItem[] = [],
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.cartItem = cartItem;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getCartItem(): CartItem[] {
    return this.cartItem;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static createCart({ id, userId }: { id: string; userId: string }): Cart {
    return new Cart(id, userId, []);
  }

  addToCart(item: CartItem): Cart {
    return new Cart(this.id, this.userId, [...this.cartItem, item]);
  }
}
