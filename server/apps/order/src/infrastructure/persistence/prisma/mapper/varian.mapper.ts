import { Prisma } from '@prisma/client';

import { Label, Price, ProductVariant, Sku } from '@libs/domain';

const variant = Prisma.validator<Prisma.ProductVariantDefaultArgs>()({
  include: { product: true },
});

type Variant = Prisma.ProductVariantGetPayload<typeof variant>;

export class VariantMapper {
  static toPrisma(data: ProductVariant): any {
    return {
      sku: data.getSku().getValue(),
      price: data.getPrice().getValue(),
      label: data.getLabel().getValue(),
      imageUrl: data.getImageUrl(),
    };
  }

  static toDomain(data: Variant): ProductVariant {
    return new ProductVariant(
      data.id,
      new Sku(data.sku),
      new Price(data.price),
      data.imageUrl,
      new Label(data.label),
      data.productId,
      data.product.name,
    );
  }
}
