import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductService } from '@libs/domain';
import { UploadService } from '@libs/shared';

import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, boolean>
{
  constructor(
    private readonly service: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(command: DeleteProductCommand): Promise<boolean> {
    const { slug } = command;

    try {
      const product = await this.service.findBySlug(slug);

      const file = product.getImageUrl();

      const result = await this.service.delete(slug);

      if (result) {
        file.map(async (i) => {
          await this.uploadService.deleteImage(i);
        });

        return true;
      }

      return true;
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
