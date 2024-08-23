import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Product, ProductService } from '@libs/domain';
import { PRODUCT_IMAGE, UploadService } from '@libs/shared';

import { AddProductCommand } from './add-product.command';

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

    try {
      const uploadImage = await this.uploadService.uploadImageToCloudinary(
        imageFile,
        PRODUCT_IMAGE,
      );

      const result = await this.service.save({
        name,
        price,
        imageUrl: uploadImage.secure_url,
        slug,
        description,
        category,
        sku,
        label,
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
