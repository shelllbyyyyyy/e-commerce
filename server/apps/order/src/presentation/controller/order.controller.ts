import {
  BadRequestException,
  Controller,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import {
  JwtAuthGuard,
  OrderMapper,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';
import { Order } from '@libs/domain';

import { CreateOrderDTO } from '@/root/order/dtos/create-order.dto';
import { UpdateOrderDTO } from '@/root/order/dtos/update-order.dto';

import { GetOrderQuery } from '@/order/application/queries/order/get-order.query';
import { GetOrderByIdQuery } from '@/order/application/queries/order/get-order-by-id.query';
import { CreateOrderCommand } from '@/order/application/command/order/create-order.command';
import { UpdateOrderCommand } from '@/order/application/command/order/update-order.command';

@Controller('order')
@UseFilters(new RpcExceptionFilter())
export class OrderController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('get_order')
  @UseGuards(JwtAuthGuard)
  async handleGetOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);
    const query = new GetOrderQuery(rpc.user.sub);

    try {
      const result = await this.query.execute<GetOrderQuery, Order[]>(query);

      this.rmqService.ack(context);

      const response = result.map((value) => OrderMapper.toJson(value));

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('get_order_by_id')
  @UseGuards(JwtAuthGuard)
  async handleGetOrderById(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute(data);
    const orderId = rpc.param;

    const query = new GetOrderByIdQuery(orderId);

    try {
      const result = await this.query.execute<GetOrderByIdQuery, Order>(query);

      this.rmqService.ack(context);

      const response = OrderMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('create_order')
  @UseGuards(JwtAuthGuard)
  async handleCreateOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<CreateOrderDTO>(data);

    const { quantity, productId } = rpc.request;

    const command = new CreateOrderCommand(rpc.user.sub, productId, quantity);

    try {
      const result = await this.command.execute<CreateOrderCommand, Order>(
        command,
      );

      this.rmqService.ack(context);

      const response = OrderMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }

  @MessagePattern('update_order')
  @UseGuards(JwtAuthGuard)
  async handleUpdateOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<UpdateOrderDTO>(data);

    const orderId = rpc.param;

    const { status } = rpc.request;

    const command = new UpdateOrderCommand(orderId, status);

    try {
      const result = await this.command.execute<UpdateOrderCommand, Order>(
        command,
      );

      this.rmqService.ack(context);

      const response = OrderMapper.toJson(result);

      return response;
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
  }
}
