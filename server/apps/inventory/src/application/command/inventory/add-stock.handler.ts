import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';

import { AddStockCommand } from './add-stock.command';
import { ProductService } from '../../services/product.service';

@CommandHandler(AddStockCommand)
export class AddStockHandler
  implements ICommandHandler<AddStockCommand, Inventory>
{
  constructor(
    private readonly service: InventoryService,
    private readonly productService: ProductService,
  ) {}

  async execute(command: AddStockCommand): Promise<Inventory> {
    const { productId, quantity } = command;

    try {
      const variant =
        await this.productService.getProductVariantById(productId);

      return this.service.addToInventory(variant, quantity);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('Update failed'));
      }
    }
  }
}
