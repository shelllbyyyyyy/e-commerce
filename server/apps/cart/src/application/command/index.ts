import { AddToCartHandler } from './cart/add-to-cart.handler';
import { DeleteCartItemHandler } from './cart/delete-cart-item.handler';
import { UpdateCartHandler } from './cart/update-cart.handler';

export const CommandHandlers = [
  AddToCartHandler,
  DeleteCartItemHandler,
  UpdateCartHandler,
];
