import { Prisma } from '@prisma/client';

import { Billing, BillingStatus, PaymentMethod } from '@libs/domain';

import { OrderMapper } from './order.mapper';

const billing = Prisma.validator<Prisma.BillingDefaultArgs>()({
  include: {
    order: {
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: true,
      },
    },
  },
});

type Billings = Prisma.BillingGetPayload<typeof billing>;

export class BillingMapper {
  static toPrisma(data: Billing): any {
    return {
      amount: data.getAmount(),
      payment: data.getPaymentMethod(),
      status: data.getStatus(),
    };
  }

  static toDomain(data: Billings): Billing {
    const order = OrderMapper.toDomain(data.order);
    return new Billing(
      data.id,
      data.order.userId,
      order,
      data.amount,
      data.payment as PaymentMethod,
      data.status as BillingStatus,
    );
  }
}
