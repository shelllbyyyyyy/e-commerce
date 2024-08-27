import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Product, ProductService } from '@libs/domain';
import { PRODUCT_IMAGE, UploadService } from '@libs/shared';

import { AddProductCommand } from './add-product.command';
import { InventoryService } from '../../service/inventory.service';

@CommandHandler(AddProductCommand)
export class AddProductHandler
  implements ICommandHandler<AddProductCommand, Product>
{
  constructor(
    private readonly service: ProductService,
    private readonly inventoryService: InventoryService,
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
      quantity,
      access_token,
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

      const variantId = result.getVariant()[0].getId();

      await this.inventoryService.addToInventory(
        variantId,
        { quantity },
        access_token,
      );

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
