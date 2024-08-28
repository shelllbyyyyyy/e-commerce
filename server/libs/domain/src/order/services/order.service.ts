import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { OrderRepository } from '../repositories/order.repository';
import { Order, OrderStatus } from '../entities/order.entity';
import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';
import { OrderProduct } from '../entities/order-product.entity';
import {
  CartItemResponse,
  InventoryResponse,
  VariantResponse,
} from '@libs/shared';
import { InventoryStatus } from '@libs/domain/inventory/entities/inventory.entity';

type CreateOrder = {
  userId: string;
  quantity?: number;
  cartitem?: CartItemResponse[];
  productVariant?: VariantResponse;
  inventory: InventoryResponse[];
};

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder({
    cartitem,
    productVariant,
    inventory,
    quantity,
    userId,
  }: CreateOrder): Promise<Order> {
    if (cartitem && !productVariant) {
      if (cartitem.length === 0) throw new Error('Item not found');

      for (const i of inventory) {
        if (i.quantity < quantity || i.status !== InventoryStatus.AVAILABLE) {
          throw new Error('Insuficient stock product');
        }
      }

      const items = cartitem.map((value) =>
        OrderProduct.createOrderProduct({
          id: randomUUID(),
          item: ProductVariant.create({
            id: value.item.id,
            imageUrl: value.item.imageUrl,
            label: value.item.label,
            price: value.item.price,
            productId: value.item.productId,
            sku: value.item.sku,
          }),
          price: value.item.price,
          quantity: value.quantity,
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
    } else if (productVariant && !cartitem) {
      for (const i of inventory) {
        if (i.quantity < quantity || i.status !== InventoryStatus.AVAILABLE) {
          throw new Error('Insuficient stock product');
        }
      }

      const { id, imageUrl, label, price, productId, sku } = productVariant;

      const item = OrderProduct.createOrderProduct({
        id: randomUUID(),
        item: ProductVariant.create({
          id,
          imageUrl,
          label,
          price,
          productId,
          sku,
        }),
        price: price,
        quantity: quantity,
        orderId: randomUUID(),
      });

      const total_amount = quantity * price;

      const result = Order.createOrder({
        id: randomUUID(),
        userId,
        items: [item],
        total_amount,
      });

      return await this.orderRepository.save(result);
    }
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
