import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { OrderService, Order } from '@libs/domain';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand, Order>
{
  constructor(private readonly service: OrderService) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const { productId, quantity, userId } = command;

    try {
      return await this.service.createOrder({
        itemId: productId,
        quantity,
        userId,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
