import { AddProductHandler } from './product/add-product.handler';
import { DeleteProductHandler } from './product/delete-product.handler';
import { UpdateProductHandler } from './product/update-product.handler';
import { AddProductVariantHandler } from './variant/add-variant.handler';
import { DeleteProductVariantHandler } from './variant/delete-variant.handler';
import { UpdateProductVariantHandler } from './variant/update-variant.handler';

export const CommandHandlers = [
  AddProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  AddProductVariantHandler,
  UpdateProductVariantHandler,
  DeleteProductVariantHandler,
];
