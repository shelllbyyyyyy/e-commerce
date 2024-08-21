import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { Inventory, InventoryRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { InventoryMapper } from '../mapper/inventory.mapper';

@Injectable()
export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(private readonly service: PrismaService) {}

  async getAllStockProduct(): Promise<Inventory[]> {
    const result = await this.service.inventory.findMany({
      include: { item: true },
    });

    return result.map((value) => InventoryMapper.toDomain(value));
  }

  async getStockProduct(productId: string): Promise<Inventory> {
    const result = await this.service.inventory.findFirst({
      where: { itemId: productId },
      include: { item: true },
    });

    return InventoryMapper.toDomain(result);
  }

  async updateStockProduct(data: Inventory): Promise<Inventory> {
    const payload: Prisma.InventoryUpdateInput = InventoryMapper.toPrisma(data);

    const result = await this.service.inventory.update({
      where: { id: data.getId() },
      data: {
        status: payload.status,
        quantity: payload.quantity,
      },
      include: { item: true },
    });

    return InventoryMapper.toDomain(result);
  }
}
