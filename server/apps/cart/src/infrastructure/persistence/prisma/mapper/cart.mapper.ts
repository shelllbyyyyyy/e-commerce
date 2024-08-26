import { Prisma } from '@prisma/client';

import { Cart } from '@libs/domain';

import { CartItemMapper } from './cart-item.mapper';

const cart = Prisma.validator<Prisma.CartDefaultArgs>()({
  include: {
    items: { include: { item: true } },
  },
});

type Carts = Prisma.CartGetPayload<typeof cart>;

export class CartMapper {
  static toPrisma(data: Cart): any {
    return {
      userId: data.getUserId(),
      items: data.getCartItem(),
    };
  }

  static toDomain(data: Carts): Cart {
    const items =
      data.items.length >= 1
        ? data.items.map((value) => CartItemMapper.toDomain(value))
        : [];
    return new Cart(data.id, data.userId, items);
  }
}
