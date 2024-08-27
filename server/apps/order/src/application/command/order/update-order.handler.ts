import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';

import { Order, OrderService } from '@libs/domain';

import { UpdateOrderCommand } from './update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler
  implements ICommandHandler<UpdateOrderCommand, Order>
{
  constructor(private readonly service: OrderService) {}

  async execute(command: UpdateOrderCommand): Promise<Order> {
    const { orderId, status } = command;

    try {
      return await this.service.updateStatus(orderId, status);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
