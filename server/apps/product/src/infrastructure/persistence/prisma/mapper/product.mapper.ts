import { Prisma } from '@prisma/client';

import { Category, Description, Price, Product, Slug } from '@libs/domain';

import { VariantMapper } from './varian.mapper';

const product = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: { select: { category: { select: { name: true } } } },
    variant: true,
  },
});

type Products = Prisma.ProductGetPayload<typeof product>;

export class ProductMapper {
  static toPrisma(data: Product): any {
    return {
      name: data.getName(),
      price: data.getPrice().getValue(),
      description: data.getDescription().getValue(),
      slug: data.getSlug().getValue(),
      imageUrl: data.getImageUrl(),
    };
  }

  static toDomain(data: Products): Product {
    const variant = data.variant.map((item) => {
      return VariantMapper.toDomain(item);
    });

    return new Product(
      data.id,
      data.name,
      new Price(data.price),
      data.imageUrl,
      new Slug(data.slug),
      new Description(data.description),
      new Category(data.category[0].category.name),
      variant,
    );
  }
}
