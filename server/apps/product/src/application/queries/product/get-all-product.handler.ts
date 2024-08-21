import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Product, ProductService } from '@libs/domain';

import { GetAllProductQuery } from './get-all-product.query';

@QueryHandler(GetAllProductQuery)
export class GetAllProductHandler
  implements IQueryHandler<GetAllProductQuery, Product[]>
{
  constructor(private readonly service: ProductService) {}

  async execute(query: GetAllProductQuery): Promise<Product[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('Product not found'));
      }
    }
  }
}
