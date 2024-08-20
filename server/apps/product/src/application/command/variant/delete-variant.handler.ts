import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductVariantService } from '@libs/domain';
import { UploadService } from '@libs/shared';

import { DeleteProductVariantCommand } from './delete-variant.command';

@CommandHandler(DeleteProductVariantCommand)
export class DeleteProductVariantHandler
  implements ICommandHandler<DeleteProductVariantCommand, boolean>
{
  constructor(
    private readonly service: ProductVariantService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: DeleteProductVariantCommand): Promise<boolean> {
    const { id } = command;

    try {
      const product = await this.service.findById(id);

      const file = product.getImageUrl();

      await this.uploadService.deleteImage(file);

      await this.service.delete(id);

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw error;
      }
    }
  }
}
