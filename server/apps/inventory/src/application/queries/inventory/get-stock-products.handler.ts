import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';
import { GetStocksQuery } from './get-stock-products.query';

@QueryHandler(GetStocksQuery)
export class GetStocksHandler
  implements IQueryHandler<GetStocksQuery, Inventory[]>
{
  constructor(private readonly service: InventoryService) {}

  async execute(query: GetStocksQuery): Promise<Inventory[]> {
    const { productIds } = query;

    try {
      return await this.service.getStockProducts(productIds);
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
