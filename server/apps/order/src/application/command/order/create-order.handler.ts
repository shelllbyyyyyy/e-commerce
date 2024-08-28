import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { OrderService, Order } from '@libs/domain';

import { CreateOrderCommand } from './create-order.command';
import { CartService } from '../../service/cart.service';
import { InventoryService } from '../../service/inventory.service';
import { CartItemResponse, InventoryResponse } from '@libs/shared';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand, Order>
{
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const { cartItemId, quantity, userId, access_token, productId } = command;

    try {
      if (cartItemId && !productId) {
        const cartItem: CartItemResponse[] =
          await this.cartService.getCartItems({ cartItemId }, access_token);

        const productIds: string[] = cartItem.map((item) => item.item.id);

        const inventory = await this.inventoryService.getStockProducts(
          { productIds },
          access_token,
        );

        const result = await this.orderService.createOrder({
          inventory,
          cartitem: cartItem,
          quantity,
          userId,
        });

        if (result) {
          await this.cartService.deleteCartItems({ cartItemId }, access_token);
        }

        return result;
      } else if (productId && !cartItemId) {
        const inventory: InventoryResponse =
          await this.inventoryService.getStockProduct(productId, access_token);

        const result = await this.orderService.createOrder({
          inventory: [inventory],
          productVariant: inventory.item,
          quantity,
          userId,
        });

        return result;
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException());
      }
    }
  }
}
