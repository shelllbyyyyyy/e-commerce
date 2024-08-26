import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { CartItem, CartService } from '@libs/domain';

import { AddToCartCommand } from './add-to-cart.command';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler
  implements ICommandHandler<AddToCartCommand, CartItem>
{
  constructor(private readonly cartService: CartService) {}

  async execute(command: AddToCartCommand): Promise<CartItem> {
    const { productId, quantity, userId } = command;

    try {
      return await this.cartService.addToCart({ productId, quantity, userId });
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
