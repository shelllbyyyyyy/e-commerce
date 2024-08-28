import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Cart, CartItem, CartRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { CartMapper } from '../mapper/cart.mapper';
import { CartItemMapper } from '../mapper/cart-item.mapper';

@Injectable()
export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly service: PrismaService) {}

  async save(data: Cart): Promise<Cart> {
    const result = await this.service.cart.create({
      data: {
        user: { connect: { id: data.getUserId() } },
      },
      include: { items: { include: { item: true } } },
    });

    return CartMapper.toDomain(result);
  }

  async addToCart(data: CartItem): Promise<CartItem> {
    const payload: Prisma.CartItemCreateInput = CartItemMapper.toPrisma(data);

    const result = await this.service.cartItem.create({
      data: {
        quantity: payload.quantity,
        item: {
          connect: {
            id: data.getItem().getId(),
          },
        },
        cart: {
          connect: {
            id: data.getCartId(),
          },
        },
      },
      include: {
        cart: true,
        item: true,
      },
    });

    return CartItemMapper.toDomain(result);
  }

  async updateCart(cartItemId: string, quantity: number): Promise<CartItem> {
    const result = await this.service.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
      include: { item: true },
    });

    return CartItemMapper.toDomain(result);
  }

  async findCartItem(cartId: string, productId: string): Promise<CartItem> {
    const cart = await this.service.cart.findUnique({
      where: { id: cartId },
    });

    const result = await this.service.cartItem.findFirst({
      where: {
        AND: [{ cartId: cart.id }, { productId }],
      },
      include: { item: true },
    });

    if (!result) return null;

    return CartItemMapper.toDomain(result);
  }

  async deleteCartItem(cartItemId: string): Promise<boolean> {
    const result = await this.service.cartItem.delete({
      where: { id: cartItemId },
    });

    if (!result) return false;

    return true;
  }

  async updateQuantity(
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem> {
    const result = await this.service.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: { increment: quantity },
      },
      include: { item: true },
    });
    return CartItemMapper.toDomain(result);
  }

  async findCartItemById(cartItemId: string): Promise<CartItem> {
    const result = await this.service.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        item: true,
      },
    });

    return CartItemMapper.toDomain(result);
  }

  async findByUserId(userId: string): Promise<Cart> {
    const result = await this.service.cart.findFirst({
      where: { userId },
      include: { user: true, items: { include: { item: true } } },
    });

    if (!result) return null;

    return CartMapper.toDomain(result);
  }

  async getCartItems(cartItemId: string[]): Promise<CartItem[]> {
    const result = await this.service.cartItem.findMany({
      where: {
        id: { in: cartItemId },
      },
      include: { item: true },
    });

    return result.map((value) => CartItemMapper.toDomain(value));
  }

  async deleteCartItems(cartItemId: string[]): Promise<boolean> {
    const result = await this.service.cartItem.deleteMany({
      where: { id: { in: cartItemId } },
    });

    if (!result) return false;

    return true;
  }
}
