import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { Inventory } from '@libs/domain';
import { JwtAuthGuard, RmqService, RpcRequestHandler } from '@libs/shared';

import { UpdateInventoryDTO } from '@/root/inventory/dtos/update-inventory.dto';

import { GetAllStockQuery } from '@/inventory/application/queries/inventory/get-all-stock-product.query';
import { GetStockQuery } from '@/inventory/application/queries/inventory/get-stock-product.query';
import { UpdateStockCommand } from '@/inventory/application/command/inventory/update-stock.command';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_all_stock_product')
  async handleGetAllStock(@Payload() data: any, @Ctx() context: RmqContext) {
    const query = new GetAllStockQuery();

    try {
      const result = await this.query.execute<GetAllStockQuery, Inventory[]>(
        query,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new NotFoundException('Stock product not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('get_stock_product')
  async handleGetStock(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);

    const query = new GetStockQuery(rpc.param);

    try {
      const result = await this.query.execute<GetStockQuery, Inventory>(query);

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new NotFoundException('Stock product not found'));
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('update_stock_product')
  async handleUpdateStock(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateInventoryDTO>(data);

    const { status, quantity } = rpc.request;

    const command = new UpdateStockCommand(rpc.param, quantity, status);

    try {
      const result = await this.command.execute<UpdateStockCommand, Inventory>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(new NotFoundException('Stock product not found'));
    }
  }
}
