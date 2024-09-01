import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Billing, BillingRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { BillingMapper } from '../mapper/billing.mapper';

@Injectable()
export class BillingRepositoryImpl implements BillingRepository {
  constructor(private readonly service: PrismaService) {}

  async findAll(): Promise<Billing[]> {
    const result = await this.service.billing.findMany({
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

    return result.map((value) => BillingMapper.toDomain(value));
  }

  async findById(billingId: string): Promise<Billing> {
    const result = await this.service.billing.findUnique({
      where: {
        id: billingId,
      },
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

    return BillingMapper.toDomain(result);
  }

  async findByOrderId(orderId: string): Promise<Billing> {
    const result = await this.service.billing.findFirst({
      where: {
        orderId,
      },
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

    return BillingMapper.toDomain(result);
  }

  async findByUserId(userId: string): Promise<Billing[]> {
    const result = await this.service.billing.findMany({
      where: {
        order: {
          userId,
        },
      },
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

    return result.map((value) => BillingMapper.toDomain(value));
  }

  async save(data: Billing): Promise<Billing> {
    const payload: Prisma.BillingCreateInput = BillingMapper.toPrisma(data);

    const result = await this.service.billing.create({
      data: {
        amount: payload.amount,
        payment: payload.payment,
        status: payload.status,
        order: {
          connect: {
            id: data.getOrder().getId(),
          },
        },
      },

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

    return BillingMapper.toDomain(result);
  }

  async update(data: Billing): Promise<Billing> {
    const payload: Prisma.BillingUpdateInput = BillingMapper.toPrisma(data);

    const result = await this.service.billing.update({
      where: {
        id: data.getId(),
      },
      data: {
        status: payload.status,
      },

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

    return BillingMapper.toDomain(result);
  }
}
