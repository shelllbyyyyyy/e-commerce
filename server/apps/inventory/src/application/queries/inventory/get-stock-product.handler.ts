import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';

import { GetStockQuery } from './get-stock-product.query';

@QueryHandler(GetStockQuery)
export class GetStockHandler
  implements IQueryHandler<GetStockQuery, Inventory>
{
  constructor(private readonly service: InventoryService) {}

  async execute(query: GetStockQuery): Promise<Inventory> {
    const { productId } = query;

    try {
      return await this.service.getStockProduct(productId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(
          new NotFoundException('Stock product not found'),
        );
      }
    }
  }
}
