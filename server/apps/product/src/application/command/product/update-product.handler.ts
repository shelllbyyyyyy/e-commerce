import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { Product, ProductService } from '@libs/domain';

import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, Product>
{
  constructor(private readonly service: ProductService) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const { name, description, price, slug } = command;

    try {
      const product = await this.service.findBySlug(slug);

      const update = product.updateProduct({ name, description, price });

      return await this.service.update(update);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(
          new BadRequestException('Update product failed'),
        );
      }
    }
  }
}
