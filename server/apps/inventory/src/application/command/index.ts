import { AddStockHandler } from './inventory/add-stock.handler';
import { DecreaseStockHandler } from './inventory/decrease-stock.handler';
import { UpdateStockHandler } from './inventory/update-stock.handler';

export const CommandHandlers = [
  UpdateStockHandler,
  AddStockHandler,
  DecreaseStockHandler,
];
