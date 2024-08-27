import { Prisma } from '@prisma/client';

import { CartItem, Quantity } from '@libs/domain';
import { VariantMapper } from './varian.mapper';

const cartItem = Prisma.validator<Prisma.CartItemDefaultArgs>()({
  include: {
    item: true,
  },
});

type CartItems = Prisma.CartItemGetPayload<typeof cartItem>;

export class CartItemMapper {
  static toPrisma(data: CartItem): any {
    return {
      cartId: data.getCartId(),
      item: data.getItem(),
      quantity: data.getQuantity().getValue(),
    };
  }

  static toDomain(data: CartItems): CartItem {
    const variant = VariantMapper.toDomain(data.item);
    return new CartItem(
      data.id,
      data.cartId,
      variant,
      new Quantity(data.quantity),
    );
  }

  static toArrayDomain(data: CartItems): CartItem {
    const variant = VariantMapper.toDomain(data.item);
    return new CartItem(
      data.id,
      data.cartId,
      variant,
      new Quantity(data.quantity),
    );
  }
}
