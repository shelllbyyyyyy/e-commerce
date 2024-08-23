import { ProductVariant as Variant } from '@prisma/client';

import { Label, Price, ProductVariant, Sku } from '@libs/domain';

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
    );
  }
}
