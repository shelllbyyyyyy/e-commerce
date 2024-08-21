import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';

import { AddStockCommand } from './add-stock.command';

@CommandHandler(AddStockCommand)
export class AddStockHandler
  implements ICommandHandler<AddStockCommand, Inventory>
{
  constructor(private readonly service: InventoryService) {}

  async execute(command: AddStockCommand): Promise<Inventory> {
    const { productId, quantity } = command;

    try {
      return this.service.addToInventory(productId, quantity);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('Update failed'));
      }
    }
  }
}
