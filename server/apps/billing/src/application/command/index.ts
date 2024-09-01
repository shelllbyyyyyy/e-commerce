import { ChargeHandler } from './billing/charge.handler';
import { UpdateBillingHandler } from './billing/update-billing.handler';

export const CommandHandlers = [ChargeHandler, UpdateBillingHandler];
