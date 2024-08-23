import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductVariant, ProductVariantRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { VariantMapper } from '../mapper/varian.mapper';

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

  async save(data: ProductVariant): Promise<ProductVariant> {
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
            id: data.getProductId(),
          },
        },
      },
      include: {
        product: true,
      },
    });

    return VariantMapper.toDomain(result);
  }

  async delete(id: string): Promise<boolean> {
    await this.service.$transaction(async (prisma) => {
      const variant = await prisma.productVariant.findUnique({
        where: { id },
        include: {
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

    const product = await this.service.$transaction(async (tx) => {
      if (data.getImageUrl()) {
        const variant = await tx.productVariant.findUnique({
          where: { id: data.getId() },
          include: {
            product: true,
          },
        });

        const files = variant.product.imageUrl;
        const update = files.filter((i) => i != variant.imageUrl);

        await tx.product.update({
          where: { slug: variant.product.slug },
          data: {
            imageUrl: update,
          },
        });

        const result = await tx.productVariant.update({
          where: { id: data.getId() },
          data: {
            ...payload,
          },
        });

        await tx.product.update({
          where: { slug: variant.product.slug },
          data: {
            imageUrl: { push: data.getImageUrl() },
          },
        });

        return VariantMapper.toDomain(result);
      } else {
        const update = await tx.productVariant.update({
          where: {
            id: data.getId(),
          },
          data: {
            ...payload,
          },
        });

        return VariantMapper.toDomain(update);
      }
    });

    return product;
  }
}
