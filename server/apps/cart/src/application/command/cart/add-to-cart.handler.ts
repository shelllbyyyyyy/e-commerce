import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

import { CartItem, CartService } from '@libs/domain';

import { AddToCartCommand } from './add-to-cart.command';
import { InventoryService } from '../../service/inventory.service';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler
  implements ICommandHandler<AddToCartCommand, CartItem>
{
  constructor(
    private readonly cartService: CartService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(command: AddToCartCommand): Promise<CartItem> {
    const { productId, quantity, userId, access_token } = command;

    try {
      const inventory = await this.inventoryService.getStockProduct(
        productId,
        access_token,
      );

      return await this.cartService.addToCart({ inventory, quantity, userId });
    } catch (error) {
      throw new RpcException(new BadRequestException('Insufficient stock'));
    }
  }
}
