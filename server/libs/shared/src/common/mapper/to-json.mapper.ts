import {
  Cart,
  CartItem,
  Inventory,
  Product,
  ProductVariant,
} from '@libs/domain';
import {
  CartItemResponse,
  CartResponse,
  InventoryResponse,
  OrderProductResponse,
  OrderResponse,
  ProductResponse,
  VariantResponse,
} from '../types';
import { Order } from '@libs/domain/order/entities/order.entity';
import { OrderProduct } from '@libs/domain/order/entities/order-product.entity';

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

export class CartMapper {
  static toJson(data: Cart): CartResponse {
    const items = data
      .getCartItem()
      .map((value) => CartItemMapper.toJson(value));
    return {
      id: data.getId(),
      userId: data.getUserId(),
      items: items,
    };
  }
}

export class CartItemMapper {
  static toJson(data: CartItem): CartItemResponse {
    const item = VariantMapper.toJson(data.getItem());

    return {
      id: data.getId(),
      item: item,
      quantity: data.getQuantity().getValue(),
    };
  }
}

export class OrderMapper {
  static toJson(data: Order): OrderResponse {
    const items = data
      .getItems()
      .map((value) => OrderProductMapper.toJson(value));

    return {
      id: data.getId(),
      userId: data.getUserId(),
      items,
      status: data.getStatus(),
      total_amount: data.getTotalAmount(),
      createdAt: data.getCreatedAt(),
      updatedAt: data.getUpdatedAt(),
    };
  }
}

export class OrderProductMapper {
  static toJson(data: OrderProduct): OrderProductResponse {
    const item = VariantMapper.toJson(data.getItem());

    return {
      id: data.getId(),
      orderId: data.getOrderId(),
      item: item,
      quantity: data.getQuantity().getValue(),
      price: data.getPrice().getValue(),
    };
  }
}
