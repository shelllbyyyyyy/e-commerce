import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';

@Injectable()
export abstract class OrderRepository {
  abstract save(data: Order): Promise<Order>;
  abstract findOrder(orderId: string): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract findByUserId(userId: string): Promise<Order[]>;
  abstract updateOrder(data: Order): Promise<Order>;
}
