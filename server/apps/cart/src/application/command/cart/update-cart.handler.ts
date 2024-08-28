import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { CartItem, CartService } from '@libs/domain';

import { UpdateCartCommand } from './update-cart.command';
import { InventoryService } from '../../service/inventory.service';

@CommandHandler(UpdateCartCommand)
export class UpdateCartHandler
  implements ICommandHandler<UpdateCartCommand, void>
{
  constructor(
    private readonly cartService: CartService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(command: UpdateCartCommand): Promise<void> {
    const { cartItemId, quantity, access_token } = command;

    try {
      const cartItem = await this.cartService.findCartItemById(cartItemId);

      const inventory = await this.inventoryService.getStockProduct(
        cartItem.getItem().getId(),
        access_token,
      );

      await this.cartService.updateQuantity({
        inventory,
        cartItemId,
        quantity,
      });
    } catch (error) {
      throw new RpcException(new BadRequestException('Insufficient stock'));
    }
  }
}
