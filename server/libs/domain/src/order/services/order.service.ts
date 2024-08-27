import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { ProductVariantRepository } from '@libs/domain/product/repositories/product-variant.repository';

import { OrderRepository } from '../repositories/order.repository';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';

type CreateOrder = {
  userId: string;
  quantity: number;
  itemId: string[];
};

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  async createOrder({ itemId, quantity, userId }: CreateOrder): Promise<Order> {
    const products = await this.productVariantRepository.findMany(itemId);

    const items = products.map((item) =>
      OrderProduct.createOrderProduct({
        id: randomUUID(),
        item: item,
        price: item.getPrice().getValue(),
        quantity: quantity,
        orderId: randomUUID(),
      }),
    );

    const total_amount = items.reduce((sum, item) => {
      return sum + item.getPrice().getValue() * item.getQuantity().getValue();
    }, 0);

    const order = Order.createOrder({
      id: randomUUID(),
      userId,
      items,
      total_amount,
    });

    return await this.orderRepository.save(order);
  }

  async getOrder(orderId: string): Promise<Order> {
    return await this.orderRepository.findOrder(orderId);
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async getOrderByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId);
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await this.orderRepository.findOrder(orderId);

    const update = order.updateOrder({ status });
    return await this.orderRepository.updateOrder(update);
  }
}
