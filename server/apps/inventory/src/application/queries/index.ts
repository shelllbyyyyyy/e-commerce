import { GetAllStockHandler } from './inventory/get-all-stock-product.handler';
import { GetStockHandler } from './inventory/get-stock-product.handler';
import { GetStocksHandler } from './inventory/get-stock-products.handler';

export const QueryHandlers = [
  GetAllStockHandler,
  GetStockHandler,
  GetStocksHandler,
];
