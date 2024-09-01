import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { InventoryService } from '@libs/domain';

import { DecreaseStockCommand } from './decrease-stock.command';

@CommandHandler(DecreaseStockCommand)
export class DecreaseStockHandler
  implements ICommandHandler<DecreaseStockCommand, any>
{
  constructor(private readonly inventoryService: InventoryService) {}

  async execute(command: DecreaseStockCommand): Promise<any> {
    const { orderId } = command;

    try {
      return await this.inventoryService.updateManyStockProduct(orderId);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
