import { OrderStatus } from '@libs/domain/order/entities/order.entity';
import { IsEnum } from 'class-validator';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
