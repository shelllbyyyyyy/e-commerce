import { ProductVariant } from '@libs/domain';
import { ProductVariant as Variant } from '@prisma/client';

export class VariantMapper {
  static toPrisma(data: ProductVariant): any {
    return {
      sku: data.getSku(),
      price: data.getPrice(),
      label: data.getLabel(),
      imageUrl: data.getImageUrl(),
    };
  }

  static toDomain(data: Variant): ProductVariant {
    return new ProductVariant(
      data.id,
      data.sku,
      data.price,
      data.imageUrl,
      data.label,
      data.productId,
    );
  }
}
