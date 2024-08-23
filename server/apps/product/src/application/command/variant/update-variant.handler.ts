import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { ProductVariant, ProductVariantService } from '@libs/domain';
import { PRODUCT_IMAGE, UploadService } from '@libs/shared';

import { UpdateProductVariantCommand } from './update-variant.command';

@CommandHandler(UpdateProductVariantCommand)
export class UpdateProductVariantHandler
  implements ICommandHandler<UpdateProductVariantCommand, ProductVariant>
{
  constructor(
    private readonly service: ProductVariantService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: UpdateProductVariantCommand): Promise<ProductVariant> {
    const { imageFile, label, sku, price, id } = command;

    let imageUrl = command.imageUrl;

    try {
      const product = await this.service.findById(id);

      if (imageFile) {
        const file = product.getImageUrl();
        await this.uploadService.deleteImage(file);

        const uploadImage = await this.uploadService.uploadImageToCloudinary(
          imageFile,
          PRODUCT_IMAGE,
        );
        imageUrl = uploadImage.secure_url;
      } else {
        imageUrl = undefined;
      }

      return await this.service.update({ id, imageUrl, label, price, sku });
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
