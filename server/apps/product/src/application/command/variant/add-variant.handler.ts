import { randomUUID } from 'crypto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductVariant, ProductVariantService } from '@libs/domain';
import { PRODUCT_IMAGE, UploadService } from '@libs/shared';

import { AddProductVariantCommand } from './add-variant.command';

@CommandHandler(AddProductVariantCommand)
export class AddProductVariantHandler
  implements ICommandHandler<AddProductVariantCommand, ProductVariant>
{
  constructor(
    private readonly service: ProductVariantService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: AddProductVariantCommand): Promise<ProductVariant> {
    const { slug, imageUrl, label, price, sku, imageFile } = command;

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

      return await this.service.save(slug, variant);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
