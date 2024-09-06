import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import {
  JwtAuthGuard,
  RmqService,
  RpcExceptionFilter,
  RpcRequestHandler,
} from '@libs/shared';

import { ChargeCommand } from '@/billing/application/command/billing/charge.command';
import { UpdateBillingCommand } from '@/billing/application/command/billing/update-billing.command';

import { ChargeDTO } from '@/root/order/dtos/charge.dto';
import { MidtransNotificationDto } from '@/root/order/dtos/notification.dto';

@Controller('billing')
@UseFilters(new RpcExceptionFilter())
export class BillingController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('charge')
  @UseGuards(JwtAuthGuard)
  async handleGenerateBill(@Payload() data: any, @Ctx() context: RmqContext) {
    const rpc = RpcRequestHandler.execute<ChargeDTO>(data);

    const charge = rpc.request;

    const command = new ChargeCommand(charge, rpc.access_token, rpc.user.sub);

    try {
      const result = await this.command.execute<ChargeCommand, any>(command);

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('update_billing')
  async handleGetNotification(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const rpc = RpcRequestHandler.execute<MidtransNotificationDto>(data);
    const { transaction_status, order_id } = rpc.request;

    const command = new UpdateBillingCommand(transaction_status, order_id);

    try {
      const result = await this.command.execute<UpdateBillingCommand, any>(
        command,
      );

      this.rmqService.ack(context);

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
