import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { CartService } from '@libs/domain';

import { DeleteCartItemCommand } from './delete-cart-item.command';

@CommandHandler(DeleteCartItemCommand)
export class DeleteCartItemHandler
  implements ICommandHandler<DeleteCartItemCommand, boolean>
{
  constructor(private readonly service: CartService) {}
  async execute(command: DeleteCartItemCommand): Promise<boolean> {
    const { cartItemId } = command;

    try {
      return await this.service.deleteCartItem(cartItemId);
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
