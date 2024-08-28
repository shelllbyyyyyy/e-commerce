import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { CartService } from '@libs/domain';
import { DeleteCartItemsCommand } from './delete-cart-items.command';

@CommandHandler(DeleteCartItemsCommand)
export class DeleteCartItemsHandler
  implements ICommandHandler<DeleteCartItemsCommand, boolean>
{
  constructor(private readonly service: CartService) {}
  async execute(command: DeleteCartItemsCommand): Promise<boolean> {
    const { cartItemId } = command;

    try {
      return await this.service.deleteCartItems(cartItemId);
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
