import { Prisma } from '@prisma/client';

import { Inventory, InventoryStatus, Quantity } from '@libs/domain';
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
      quantity: data.getQuantity().getValue(),
    };
  }

  static toDomain(data: Inventories): Inventory {
    const variant = VariantMapper.toDomain(data.item);
    return new Inventory(
      data.id,
      new Quantity(data.quantity),
      data.status as unknown as InventoryStatus,
      variant,
    );
  }
}
