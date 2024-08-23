import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Product, ProductRepository } from '@libs/domain';
import { PrismaService } from '@libs/shared';

import { ProductMapper } from '../mapper/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly service: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const result = await this.service.product.findMany({
      include: {
        category: {
          include: {
            category: { select: { name: true } },
          },
        },
        variant: true,
      },
    });

    return result.map((product) => ProductMapper.toDomain(product));
  }

  async save(data: Product): Promise<Product> {
    const payload: Prisma.ProductCreateInput = ProductMapper.toPrisma(data);

    const newProduct = await this.service.product.create({
      data: {
        ...payload,
        variant: {
          create: {
            sku: data.getVariant()[0].getSku().getValue(),
            imageUrl: data.getImageUrl()[0],
            price: data.getPrice().getValue(),
            label: data.getVariant()[0].getLabel().getValue(),
          },
        },
        category: {
          create: {
            category: {
              connectOrCreate: {
                create: { name: data.getCategory().getValue() },
                where: { name: data.getCategory().getValue() },
              },
            },
          },
        },
      },
      include: {
        variant: true,
        category: {
          include: {
            category: true,
          },
        },
      },
    });

    return ProductMapper.toDomain(newProduct);
  }

  async findById(id: string): Promise<Product> {
    const result = await this.service.product.findUnique({
      where: { id },
      include: { category: { include: { category: true } }, variant: true },
    });

    return ProductMapper.toDomain(result);
  }

  async findBySlug(slug: string): Promise<Product> {
    const result = await this.service.product.findUnique({
      where: { slug },
      include: { category: { include: { category: true } }, variant: true },
    });

    return ProductMapper.toDomain(result);
  }

  async update(data: Product): Promise<Product> {
    const result = await this.service.product.update({
      where: { slug: data.getSlug().getValue() },
      data: {
        ...data,
      },
      include: { category: { include: { category: true } }, variant: true },
    });

    return ProductMapper.toDomain(result);
  }

  async delete(slug: string): Promise<boolean> {
    const result = await this.service.product.delete({
      where: { slug },
    });

    if (result) return true;

    return false;
  }
}
