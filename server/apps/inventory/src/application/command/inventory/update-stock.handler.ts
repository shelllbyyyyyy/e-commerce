import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';

import { UpdateStockCommand } from './update-stock.command';

@CommandHandler(UpdateStockCommand)
export class UpdateStockHandler
  implements ICommandHandler<UpdateStockCommand, Inventory>
{
  constructor(private readonly service: InventoryService) {}

  async execute(command: UpdateStockCommand): Promise<Inventory> {
    const { productId, quantity, status } = command;

    try {
      const inventory = await this.service.getStockProduct(productId);

      const update = inventory.updateStock({ quantity, status });

      return await this.service.updateStockProduct(update);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException('Update failed'));
      }
    }
  }
}
