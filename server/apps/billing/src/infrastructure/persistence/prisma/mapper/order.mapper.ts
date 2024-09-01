import { Prisma } from '@prisma/client';

import { Order, OrderStatus } from '@libs/domain';

import { OrderProductMapper } from './order-product.mapper';

const order = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: { items: { include: { item: true } } },
});

type Orders = Prisma.OrderGetPayload<typeof order>;

export class OrderMapper {
  static toPrisma(data: Order): any {
    const items = OrderProductMapper.toPrisma(data.getItems());
    return {
      userId: data.getUserId(),
      items,
      totalAmount: data.getTotalAmount(),
      status: data.getStatus(),
    };
  }

  static toDomain(data: Orders): Order {
    const items = data.items.map((value) => OrderProductMapper.toDomain(value));
    return new Order(
      data.id,
      data.userId,
      items,
      data.totalAmount,
      data.status as unknown as OrderStatus,
      data.createdAt,
      data.updatedAt,
    );
  }
}
