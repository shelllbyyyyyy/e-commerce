import { GetAllProductHandler } from './product/get-all-product.handler';
import { GetProductByIdHandler } from './product/get-product-by-id.handler';
import { GetProductBySlugHandler } from './product/get-product-by-slug.handler';
import { GetProductVariantByIdHandler } from './variant/get-product-variant-by-id.handler';

export const QueryHandlers = [
  GetProductByIdHandler,
  GetProductBySlugHandler,
  GetAllProductHandler,
  GetProductVariantByIdHandler,
];
