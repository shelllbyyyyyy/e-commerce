import { Prisma } from '@prisma/client';

import { Inventory, InventoryStatus } from '@libs/domain';

import { VariantMapper } from '@/product/infrastructure/persistence/prisma/mapper/varian.mapper';

const inventory = Prisma.validator<Prisma.InventoryDefaultArgs>()({
  include: {
    item: true,
  },
});

type Inventories = Prisma.InventoryGetPayload<typeof inventory>;

export class InventoryMapper {
  static toPrisma(data: Inventory): any {
    return {
      status: data.getStatus(),
      quantity: data.getQuantity(),
    };
  }

  static toDomain(data: Inventories): Inventory {
    return new Inventory(
      data.id,
      data.quantity,
      data.status as InventoryStatus,
      VariantMapper.toDomain(data.item),
    );
  }
}
