import { Injectable } from '@nestjs/common';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export abstract class CartRepository {
  abstract save(data: Cart): Promise<Cart>;
  abstract addToCart(data: CartItem): Promise<CartItem>;
  abstract updateQuantity(
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem>;
  abstract updateCart(cartItemId: string, quantity: number): Promise<CartItem>;
  abstract findCartItem(cartId: string, productId: string): Promise<CartItem>;
  abstract findByUserId(userId: string): Promise<Cart>;
  abstract deleteCartItem(cartItemId: string): Promise<boolean>;
}
