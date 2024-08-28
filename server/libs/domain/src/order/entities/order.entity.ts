import { OrderProduct } from './order-product.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class Order {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly items: OrderProduct[],
    private readonly total_amount: number,
    private readonly status: OrderStatus,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.total_amount = total_amount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getItems(): OrderProduct[] {
    return this.items;
  }

  getTotalAmount(): number {
    return this.total_amount;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static createOrder({
    id,
    userId,
    items,
    total_amount,
  }: {
    id: string;
    userId: string;
    items: OrderProduct[];
    total_amount: number;
  }): Order {
    return new Order(id, userId, items, total_amount, OrderStatus.PENDING);
  }

  updateOrder({ status }: { status: OrderStatus }): Order {
    return new Order(
      this.id,
      this.userId,
      this.items,
      this.total_amount,
      status,
    );
  }
}
