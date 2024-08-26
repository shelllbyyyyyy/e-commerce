import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { CartItem, CartService } from '@libs/domain';

import { UpdateCartCommand } from './update-cart.command';

@CommandHandler(UpdateCartCommand)
export class UpdateCartHandler
  implements ICommandHandler<UpdateCartCommand, CartItem>
{
  constructor(private readonly cartService: CartService) {}

  async execute(command: UpdateCartCommand): Promise<CartItem> {
    const { cartItemId, quantity } = command;

    try {
      return await this.cartService.updateQuantity({ cartItemId, quantity });
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
