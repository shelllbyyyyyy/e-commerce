import { CreateOrderHandler } from './order/create-order.handler';
import { UpdateOrderHandler } from './order/update-order.handler';

export const CommandHandlers = [CreateOrderHandler, UpdateOrderHandler];
