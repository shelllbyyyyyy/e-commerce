import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { InventoryStatus } from '@libs/domain/inventory/entities/inventory.entity';
import { ProductVariant } from '@libs/domain/product/entities/product-variant.entity';
import { InventoryResponse } from '@libs/shared';

import { CartRepository } from '../repositories/cart.repository';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

type AddToCart = {
  userId: string;
  inventory: InventoryResponse;
  quantity: number;
};

type UpdateCart = {
  cartItemId: string;
  quantity: number;
  inventory: InventoryResponse;
};

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addToCart({
    inventory,
    quantity,
    userId,
  }: AddToCart): Promise<CartItem> {
    let cart: Cart;

    const currentQuantity = inventory.quantity;
    const status = inventory.status;

    if (currentQuantity < quantity || status !== InventoryStatus.AVAILABLE) {
      throw new Error('Insufficient stock');
    }

    cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      const newCart = Cart.createCart({ id: randomUUID(), userId });

      cart = await this.cartRepository.save(newCart);
    }

    const cartItem = await this.cartRepository.findCartItem(
      cart.getId(),
      inventory.item.id,
    );

    if (!cartItem) {
      const { id, imageUrl, label, price, productId, sku } = inventory.item;
      const item = ProductVariant.create({
        id,
        sku,
        price,
        imageUrl,
        label,
        productId,
      });

      const newItem = CartItem.newItem({
        id: randomUUID(),
        cartId: cart.getId(),
        item: item,
        quantity,
      });

      return await this.cartRepository.addToCart(newItem);
    } else {
      const cartQuantity = cartItem.getQuantity().getValue() + quantity;

      if (
        currentQuantity < cartQuantity ||
        status !== InventoryStatus.AVAILABLE
      ) {
        throw new Error('Insufficient stock');
      }

      return await this.cartRepository.updateQuantity(
        cartItem.getId(),
        quantity,
      );
    }
  }

  async getCart(userId: string): Promise<Cart> {
    return await this.cartRepository.findByUserId(userId);
  }

  async findCartItemById(cartItemId: string): Promise<CartItem> {
    return await this.cartRepository.findCartItemById(cartItemId);
  }

  async updateQuantity({
    cartItemId,
    quantity,
    inventory,
  }: UpdateCart): Promise<void> {
    const currentQuantity = inventory.quantity;
    const status = inventory.status;

    if (currentQuantity < quantity || status !== InventoryStatus.AVAILABLE) {
      throw new Error('Insufficient stock');
    }

    const update = await this.cartRepository.updateCart(cartItemId, quantity);

    if (update.getQuantity().getValue() === 0) {
      await this.cartRepository.deleteCartItem(cartItemId);
    }
  }

  async deleteCartItem(cartItemId: string): Promise<boolean> {
    return await this.cartRepository.deleteCartItem(cartItemId);
  }

  async deleteCartItems(cartItemId: string[]): Promise<boolean> {
    return await this.cartRepository.deleteCartItems(cartItemId);
  }

  async getCartItems(cartItemId: string[]): Promise<CartItem[]> {
    return await this.cartRepository.getCartItems(cartItemId);
  }
}
