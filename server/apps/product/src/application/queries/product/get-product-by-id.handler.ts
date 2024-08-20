import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Product, ProductService } from '@libs/domain';

import { GetProductByIdQuery } from './get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery, Product>
{
  constructor(private readonly service: ProductService) {}

  async execute(query: GetProductByIdQuery): Promise<Product> {
    const { id } = query;
    try {
      return await this.service.findById(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('Product not found'));
      }
    }
  }
}
