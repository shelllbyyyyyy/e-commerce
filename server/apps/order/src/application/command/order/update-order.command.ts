import { OrderStatus } from '@libs/domain';

export class UpdateOrderCommand {
  constructor(
    public orderId: string,
    public status: OrderStatus,
  ) {}
}
