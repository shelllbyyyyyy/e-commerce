import { Prisma } from '@prisma/client';

import { OrderProduct, Price, Quantity } from '@libs/domain';

import { VariantMapper } from './varian.mapper';

const orderProduct = Prisma.validator<Prisma.OrderProductDefaultArgs>()({
  include: { item: true },
});

type OrderProducts = Prisma.OrderProductGetPayload<typeof orderProduct>;

export class OrderProductMapper {
  static toPrisma(data: OrderProduct[]): any {
    return data.map((value) => {
      return {
        order: {
          connect: { id: value.getOrderId() },
        },
        item: {
          connect: {
            id: value.getItem().getId(),
          },
        },
        price: value.getPrice().getValue(),
        quantity: value.getQuantity().getValue(),
      };
    });
  }

  static toDomain(data: OrderProducts): OrderProduct {
    const item = VariantMapper.toDomain(data.item);
    return new OrderProduct(
      data.id,
      data.orderId,
      item,
      new Quantity(data.quantity),
      new Price(data.price),
    );
  }
}
