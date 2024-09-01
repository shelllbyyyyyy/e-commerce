import {
  Address,
  Cart,
  CartItem,
  Inventory,
  Product,
  ProductVariant,
  User,
} from '@libs/domain';
import {
  AddressResponse,
  CartItemResponse,
  CartResponse,
  InventoryResponse,
  OrderProductResponse,
  OrderResponse,
  ProductResponse,
  UserResponse,
  VariantResponse,
} from '../types';
import { Order } from '@libs/domain/order/entities/order.entity';
import { OrderProduct } from '@libs/domain/order/entities/order-product.entity';

export class UserMapper {
  static toJson(data: User): UserResponse {
    return {
      id: data.getId(),
      username: data.getUsername(),
      email: data.getEmail(),
      display_name: data.getDisplayName(),
      phone_number: data.getPhoneNumber(),
      profile_picture: data.getProfilePicture(),
    };
  }
}

export class AddressMapper {
  static toJson(data: Address): AddressResponse {
    return {
      id: data.getId(),
      first_name: data.getFirstname(),
      last_name: data.getLastname(),
      phone_number: data.getPhoneNumber(),
      street: data.getStreet(),
      city: data.getCity(),
      state: data.getState(),
      postal_code: data.getPostalCode(),
      country_code: data.getCountryCode(),
      mapUrl: data.getMapUrl(),
    };
  }
}

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
      name: data.getName(),
      price: data.getPrice().getValue(),
      imageUrl: data.getImageUrl(),
      label: data.getLabel().getValue(),
      productId: data.getProductId(),
    };
  }

  static toJsonWithName(data: ProductVariant): VariantResponse {
    return {
      id: data.getId(),
      sku: data.getSku().getValue(),
      name: data.getName(),
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

export class OrderPayment {
  static toJson(data: Order): OrderResponse {
    const items = data
      .getItems()
      .map((value) => OrderProductMapper.toJsonOrder(value));

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
    const item = VariantMapper.toJsonWithName(data.getItem());

    return {
      id: data.getId(),
      orderId: data.getOrderId(),
      item: item,
      quantity: data.getQuantity().getValue(),
      price: data.getPrice().getValue(),
    };
  }

  static toJsonOrder(data: OrderProduct): OrderProductResponse {
    const item = VariantMapper.toJsonWithName(data.getItem());

    return {
      id: data.getId(),
      item,
      name: item.name,
      sku: item.sku,
      productId: item.productId,
      quantity: data.getQuantity().getValue(),
      price: data.getPrice().getValue(),
    };
  }
}
