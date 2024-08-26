import { InventoryStatus } from '@libs/domain';

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
