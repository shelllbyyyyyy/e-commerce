export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
  slug: string;
  description: string;
  category: string;
  variant: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name?: string;
  sku: string;
  price: number;
  imageUrl: string;
  label: string;
  productId: string;
};
