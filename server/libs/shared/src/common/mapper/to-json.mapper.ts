import { Inventory, Product, ProductVariant } from '@libs/domain';
import { InventoryResponse, ProductResponse, VariantResponse } from '../types';

export class ProductMapper {
  static toJson(data: Product): ProductResponse {
    const variant = data
      .getVariant()
      .map((value) => VariantMapper.toJson(value));

    return {
      id: data.getId(),
      name: data.getName(),
      price: data.getPrice().getValue(),
      imageUrl: data.getImageUrl(),
      slug: data.getSlug().getValue(),
      description: data.getDescription().getValue(),
      category: data.getCategory().getValue(),
      variant: variant,
    };
  }
}

export class VariantMapper {
  static toJson(data: ProductVariant): VariantResponse {
    return {
      id: data.getId(),
      sku: data.getSku().getValue(),
      price: data.getPrice().getValue(),
      imageUrl: data.getImageUrl(),
      label: data.getLabel().getValue(),
      productId: data.getProductId(),
    };
  }
}

export class InventoryMapper {
  static toJson(data: Inventory): InventoryResponse {
    const variant = VariantMapper.toJson(data.getItem());
    return {
      id: data.getId(),
      quantity: data.getQuantity().getValue(),
      status: data.getStatus(),
      item: variant,
    };
  }
}
