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
    const { slug, label, price, sku, imageFile } = command;

    try {
      const uploadImage = await this.uploadService.uploadImageToCloudinary(
        imageFile,
        PRODUCT_IMAGE,
      );

      return await this.service.save({
        sku,
        price,
        imageUrl: uploadImage.secure_url,
        slug,
        label,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
