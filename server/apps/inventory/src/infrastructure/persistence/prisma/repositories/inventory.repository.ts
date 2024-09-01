import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { Inventory, InventoryRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { InventoryMapper } from '../mapper/inventory.mapper';

@Injectable()
export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(private readonly service: PrismaService) {}

  async addToInventory(data: Inventory): Promise<Inventory> {
    const result = await this.service.inventory.create({
      data: {
        quantity: data.getQuantity().getValue(),
        status:
          data.getQuantity().getValue() == 0 ||
          data.getQuantity().getValue() < 1
            ? 'RESERVED'
            : 'AVAILABLE',
        item: { connect: { id: data.getItem().getId() } },
      },
      include: { item: true },
    });

    return InventoryMapper.toDomain(result);
  }

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

  async getStockProducts(productIds: string[]): Promise<Inventory[]> {
    const result = await this.service.inventory.findMany({
      where: { itemId: { in: productIds } },
      include: { item: true },
    });

    return result.map((value) => InventoryMapper.toDomain(value));
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

  async updateManyStockProduct(orderId: string): Promise<void> {
    const order = await this.service.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    const productUpdates = order.items.reduce(
      (acc, item) => {
        acc[item.itemId] = (acc[item.itemId] || 0) + item.quantity;
        return acc;
      },
      {} as Record<string, number>,
    );

    await this.service.$transaction(async (tx) => {
      await Promise.all(
        Object.entries(productUpdates).map(async ([itemId, quantity]) => {
          const inventory = await tx.inventory.findMany({
            where: {
              itemId,
            },
            select: { id: true },
          });

          const inventoryIds = inventory.map((item) => item.id);

          const result = await tx.inventory.updateMany({
            where: { id: { in: inventoryIds } },
            data: { quantity: { decrement: quantity } },
          });

          const updatedInventories = await tx.inventory.findMany({
            where: { id: { in: inventoryIds } },
            select: { id: true, quantity: true },
          });

          await Promise.all(
            updatedInventories.map((inventory) =>
              tx.inventory.update({
                where: { id: inventory.id },
                data: {
                  status: inventory.quantity <= 0 ? 'RESERVED' : 'AVAILABLE',
                },
              }),
            ),
          );

          return result;
        }),
      );
    });
  }
}
