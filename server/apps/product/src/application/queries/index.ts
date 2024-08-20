import { GetAllProductHandler } from './product/get-all-product.handler';
import { GetProductByIdHandler } from './product/get-product-by-id.handler';
import { GetProductBySlugHandler } from './product/get-product-by-slug.handler';
import { GetProductVariantByIdQuery } from './variant/get-product-variant-by-id.query';

export const QueryHandlers = [
  GetProductByIdHandler,
  GetProductBySlugHandler,
  GetAllProductHandler,
  GetProductVariantByIdQuery,
];
