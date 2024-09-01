import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { OrderResponse } from '@libs/shared';

import { BillingRepository } from '../repositories/billing.repository';
import { Billing, PaymentMethod } from '../entities/billing';
import { Order } from '@libs/domain/order/entities/order.entity';
import { OrderProduct } from '@libs/domain/order/entities/order-product.entity';
import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';

type CreateBilling = {
  userId: string;
  order: OrderResponse;
  amount: number;
  payment_method: PaymentMethod;
};

@Injectable()
export class BillingService {
  constructor(private readonly repository: BillingRepository) {}

  async createBilling({
    amount,
    order,
    payment_method,
    userId,
  }: CreateBilling): Promise<Billing> {
    const { id, items, total_amount } = order;

    const orderProduct = items.map((value) => {
      const item = ProductVariant.create({
        id: value.item.id,
        sku: value.item.sku,
        imageUrl: value.item.imageUrl,
        label: value.item.label,
        price: value.item.price,
        productId: value.item.productId,
      });

      return OrderProduct.createOrderProduct({
        id: value.id,
        item,
        orderId: value.orderId,
        price: value.price,
        quantity: value.quantity,
      });
    });

    const getOrder = Order.createOrder({
      id,
      userId,
      items: orderProduct,
      total_amount,
    });

    const newBill = Billing.createNewBilling({
      id: randomUUID(),
      userId,
      order: getOrder,
      amount,
      payment_method,
    });

    return await this.repository.save(newBill);
  }

  async markAsPaid(billingId: string): Promise<Billing> {
    const bill = await this.repository.findById(billingId);

    const updateBill = bill.markAsPaid();

    return this.repository.update(updateBill);
  }

  async markAsFailed(billingId: string): Promise<Billing> {
    const bill = await this.repository.findById(billingId);

    const updateBill = bill.markAsFailed();

    return this.repository.update(updateBill);
  }

  async findById(billingId: string): Promise<Billing> {
    return await this.repository.findById(billingId);
  }

  async findByUserId(userId: string): Promise<Billing[]> {
    return await this.repository.findByUserId(userId);
  }

  async findByOrderId(orderId: string): Promise<Billing> {
    return await this.repository.findByOrderId(orderId);
  }

  async findAll(): Promise<Billing[]> {
    return await this.repository.findAll();
  }
}
