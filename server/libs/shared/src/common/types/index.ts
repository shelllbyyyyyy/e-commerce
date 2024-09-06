import { InventoryStatus } from '@libs/domain';
import { OrderStatus } from '@libs/domain/order/entities/order.entity';

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  display_name: string;
  profile_picture: string;
  phone_number: string;
  address?: AddressResponse;
};

export type AddressResponse = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  mapUrl?: string;
};

export type ProductResponse = {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
  slug: string;
  description: string;
  category: string;
  variant: VariantResponse[];
};

export type VariantResponse = {
  id: string;
  name?: string;
  sku: string;
  price: number;
  imageUrl: string;
  label: string;
  productId: string;
};

export type InventoryResponse = {
  id: string;
  quantity: number;
  status: InventoryStatus;
  item: VariantResponse;
};

export type CartResponse = {
  id: string;
  userId: string;
  items: CartItemResponse[];
};

export type CartItemResponse = {
  id: string;
  item: VariantResponse;
  quantity: number;
};

export type OrderResponse = {
  id: string;
  userId: string;
  items: OrderProductResponse[];
  total_amount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderProductResponse = {
  id: string;
  orderId?: string;
  item?: VariantResponse;
  name?: string;
  sku?: string;
  category?: string;
  variantId?: string;
  productId?: string;
  quantity: number;
  price: number;
};

// src/auth/auth.types.ts

export type GoogleProfile = {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: { value: string }[];
  photos: { value: string }[];
};

export type AuthenticatedUser = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
};
