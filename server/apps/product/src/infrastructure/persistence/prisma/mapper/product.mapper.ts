import { Product, ProductVariant } from '@libs/domain';

import { Prisma } from '@prisma/client';

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
      price: data.getPrice(),
      description: data.getDescription(),
      slug: data.getSlug(),
      imageUrl: data.getImageUrl(),
    };
  }

  static toDomain(data: Products): Product {
    const variant = data.variant.map((item) => {
      return new ProductVariant(
        item.id,
        item.sku,
        item.price,
        item.imageUrl,
        item.label,
        item.productId,
      );
    });
    return new Product(
      data.id,
      data.name,
      data.price,
      data.imageUrl,
      data.slug,
      data.description,
      data.category[0].category.name,
      variant,
    );
  }
}
