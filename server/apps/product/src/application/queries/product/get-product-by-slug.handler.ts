import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { Product, ProductService } from '@libs/domain';

import { GetProductBySlugQuery } from './get-product-by-slug.query';

@QueryHandler(GetProductBySlugQuery)
export class GetProductBySlugHandler
  implements IQueryHandler<GetProductBySlugQuery, Product>
{
  constructor(private readonly service: ProductService) {}

  async execute(query: GetProductBySlugQuery): Promise<Product> {
    const { slug } = query;

    try {
      return await this.service.findBySlug(slug);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new NotFoundException('Product not found'));
      }
    }
  }
}
