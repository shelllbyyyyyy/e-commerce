import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Product, ProductService, ProductVariant } from '@libs/domain';

import { AddProductCommand } from './add-product.command';
import { randomUUID } from 'crypto';
import { PRODUCT_IMAGE, UploadService } from '@libs/shared';

@CommandHandler(AddProductCommand)
export class AddProductHandler
  implements ICommandHandler<AddProductCommand, Product>
{
  constructor(
    private readonly service: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: AddProductCommand): Promise<Product> {
    const {
      name,
      category,
      description,
      imageUrl,
      label,
      price,
      sku,
      slug,
      imageFile,
    } = command;

    const id = randomUUID();

    try {
      const uploadImage = await this.uploadService.uploadImageToCloudinary(
        imageFile,
        PRODUCT_IMAGE,
      );

      const variant = new ProductVariant(
        id,
        sku,
        price,
        uploadImage.url,
        label,
        id,
      );

      const product = new Product(
        id,
        name,
        price,
        [uploadImage.url],
        slug,
        description,
        category,
        [variant],
      );

      return await this.service.save(product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
