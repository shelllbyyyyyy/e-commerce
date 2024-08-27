import { Order, OrderProduct, OrderRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';
import { Injectable } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';
import { Prisma } from '@prisma/client';
import { OrderProductMapper } from '../mapper/order-product.mapper';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly service: PrismaService) {}

  async findAll(): Promise<Order[]> {
    const result = await this.service.order.findMany({
      include: {
        items: {
          include: { item: true },
        },
      },
    });

    return result.map((value) => OrderMapper.toDomain(value));
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const result = await this.service.order.findMany({
      where: { userId },
      include: { items: { include: { item: true } } },
    });

    return result.map((value) => OrderMapper.toDomain(value));
  }

  async findOrder(orderId: string): Promise<Order> {
    const result = await this.service.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { item: true } } },
    });

    return OrderMapper.toDomain(result);
  }

  async save(data: Order): Promise<Order> {
    const result = await this.service.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          status: 'PENDING',
          totalAmount: 0,
          user: { connect: { id: data.getUserId() } },
        },
        include: { user: true },
      });

      data.getItems().map(async (value) => {
        await tx.orderProduct.create({
          data: {
            price: value.getPrice().getValue(),
            quantity: value.getQuantity().getValue(),
            item: {
              connect: {
                id: value.getItem().getId(),
              },
            },
            order: {
              connect: {
                id: newOrder.id,
              },
            },
          },
        });
      });

      const update = await tx.order.update({
        where: {
          id: newOrder.id,
        },
        data: {
          totalAmount: data.getTotalAmount(),
        },
        include: {
          items: { include: { item: true } },
        },
      });

      return OrderMapper.toDomain(update);
    });
    return result;
  }

  async updateOrder(data: Order): Promise<Order> {
    const payload: Prisma.OrderUpdateInput = OrderMapper.toPrisma(data);
    const update = await this.service.order.update({
      where: {
        id: data.getId(),
      },
      data: {
        status: payload.status,
      },
      include: {
        items: { include: { item: true } },
      },
    });

    return OrderMapper.toDomain(update);
  }
}
