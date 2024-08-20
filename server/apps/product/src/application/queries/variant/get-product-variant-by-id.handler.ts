import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductVariant, ProductVariantService } from '@libs/domain';
import { GetProductVariantByIdQuery } from './get-product-variant-by-id.query';

@QueryHandler(GetProductVariantByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductVariantByIdQuery, ProductVariant>
{
  constructor(private readonly service: ProductVariantService) {}

  async execute(query: GetProductVariantByIdQuery): Promise<ProductVariant> {
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
