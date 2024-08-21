import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Inventory, InventoryService } from '@libs/domain';

import { GetAllStockQuery } from './get-all-stock-product.query';

@QueryHandler(GetAllStockQuery)
export class GetAllStockHandler
  implements IQueryHandler<GetAllStockQuery, Inventory[]>
{
  constructor(private readonly service: InventoryService) {}

  async execute(query: GetAllStockQuery): Promise<Inventory[]> {
    const {} = query;

    try {
      return await this.service.getAllStockProduct();
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
