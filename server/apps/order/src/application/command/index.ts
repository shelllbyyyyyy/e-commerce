import { ChargeHandler } from './billing/charge.handler';
import { UpdateBillingHandler } from './billing/update-billing.handler';

import { CreateOrderHandler } from './order/create-order.handler';
import { UpdateOrderHandler } from './order/update-order.handler';

export const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  ChargeHandler,
  UpdateBillingHandler,
];
