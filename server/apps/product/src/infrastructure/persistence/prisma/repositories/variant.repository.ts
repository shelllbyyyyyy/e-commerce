import { ProductVariant, ProductVariantRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';
import { Injectable } from '@nestjs/common';
import { VariantMapper } from '../mapper/varian.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductVariantRepositoryImpl implements ProductVariantRepository {
  constructor(private readonly service: PrismaService) {}

  async findById(id: string): Promise<ProductVariant> {
    const result = await this.service.productVariant.findUnique({
      where: { id },
      include: { inventory: true },
    });

    return VariantMapper.toDomain(result);
  }

  async save(slug: string, data: ProductVariant): Promise<ProductVariant> {
    const payload: Prisma.ProductVariantCreateInput =
      VariantMapper.toPrisma(data);

    const { sku, imageUrl, label, price } = payload;

    const result = await this.service.productVariant.create({
      data: {
        sku,
        imageUrl,
        label,
        price,
        product: {
          connect: {
            slug,
          },
        },
        inventory: {
          create: {
            quantity: 1,
            status: 'AVAILABLE',
          },
        },
      },
      include: {
        product: true,
        inventory: true,
      },
    });

    return VariantMapper.toDomain(result);
  }

  async delete(id: string): Promise<boolean> {
    await this.service.$transaction(async (prisma) => {
      const variant = await prisma.productVariant.findUnique({
        where: { id },
        include: {
          inventory: true,
          product: true,
        },
      });

      const files = variant.product.imageUrl;
      const update = files.filter((i) => i != variant.imageUrl);

      await prisma.product.update({
        where: { slug: variant.product.slug },
        data: {
          imageUrl: update,
        },
      });

      const result = await prisma.productVariant.delete({ where: { id } });
      if (result) return true;
    });

    return false;
  }

  async update(data: ProductVariant): Promise<ProductVariant> {
    const payload: Prisma.ProductVariantUpdateInput =
      VariantMapper.toPrisma(data);

    if (data.getImageUrl()) {
      await this.service.productVariant.update({
        where: { id: data.getId() },
        data: {
          imageUrl: data.getImageUrl(),
        },
      });
    }
    const update = await this.service.productVariant.update({
      where: {
        id: data.getId(),
      },
      data: payload,
    });

    return VariantMapper.toDomain(update);
  }
}
