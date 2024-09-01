import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { BillingService } from '@libs/domain';
import { AddressResponse, OrderResponse, UserResponse } from '@libs/shared';

import { GetPaymentMethod } from '@/billing/common/payment';
import { MidtransService } from '@/billing/infrastructure/midtrans/midtrans.service';
import { MidtransError } from '@/billing/infrastructure/midtrans/midtrans.error';

import { ChargeCommand } from './charge.command';
import { OrderService } from '../../service/order.service';
import { UserService } from '../../service/user.service';

@CommandHandler(ChargeCommand)
export class ChargeHandler implements ICommandHandler<ChargeCommand, any> {
  constructor(
    private readonly billingService: BillingService,
    private readonly getPaymentService: GetPaymentMethod,
    private readonly midtransService: MidtransService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  async execute(command: ChargeCommand): Promise<any> {
    const { charge, access_token, userId } = command;

    const { payment_method, transfer_method } = charge;

    try {
      const order: OrderResponse = await this.orderService.getOrderById(
        charge.orderId,
        access_token,
      );

      const user: UserResponse = await this.userService.getUser(access_token);
      const address: AddressResponse = await this.userService.getAddress(
        charge.addressId,
        access_token,
      );

      const payload = this.getPaymentService.execute(
        payment_method,
        user,
        address,
        order,
        transfer_method,
      );

      const result = await this.midtransService.charge(payload);

      if (result) {
        await this.billingService.createBilling({
          amount: order.total_amount,
          payment_method,
          order: order,
          userId,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof MidtransError) {
        throw new RpcException(error);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(new BadRequestException(error.message));
      } else {
        throw new RpcException(new BadRequestException(error));
      }
    }
  }
}
