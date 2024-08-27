import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { InventoryRepository } from '@libs/domain/inventory/repositories/inventory.repository';
import { ProductVariantRepository } from '@libs/domain/product/repositories/product-variant.repository';

import { CartRepository } from '../repositories/cart.repository';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { InventoryStatus } from '@libs/domain/inventory/entities/inventory.entity';

type AddToCart = {
  userId: string;
  productId: string;
  quantity: number;
};

type UpdateCart = {
  cartItemId: string;
  quantity: number;
};

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async addToCart({
    productId,
    quantity,
    userId,
  }: AddToCart): Promise<CartItem> {
    let cart: Cart;
    const checkStock =
      await this.inventoryRepository.getStockProduct(productId);

    const currentQuantity = checkStock.getQuantity().getValue();
    const status = checkStock.getStatus();

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
      productId,
    );

    if (!cartItem) {
      const product = await this.productVariantRepository.findById(productId);

      const newItem = CartItem.newItem({
        id: randomUUID(),
        cartId: cart.getId(),
        item: product,
        quantity,
      });

      return await this.cartRepository.addToCart(newItem);
    } else {
      return await this.cartRepository.updateQuantity(
        cartItem.getId(),
        quantity,
      );
    }
  }

  async getCart(userId: string): Promise<Cart> {
    return await this.cartRepository.findByUserId(userId);
  }

  async updateQuantity({
    cartItemId,
    quantity,
  }: UpdateCart): Promise<CartItem> {
    return await this.cartRepository.updateCart(cartItemId, quantity);
  }

  async deleteCartItem(cartItemId: string): Promise<boolean> {
    return await this.cartRepository.deleteCartItem(cartItemId);
  }
}
