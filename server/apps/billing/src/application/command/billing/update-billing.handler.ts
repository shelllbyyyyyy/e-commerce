import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

import { BillingService } from '@libs/domain/billing/services/billing.service';

import { MidtransError } from '@/billing/infrastructure/midtrans/midtrans.error';
import { TransactionStatus } from '@/billing/common/enum';

import { UpdateBillingCommand } from './update-billing.command';
import { InventoryService } from '../../service/inventory.service';

@CommandHandler(UpdateBillingCommand)
export class UpdateBillingHandler
  implements ICommandHandler<UpdateBillingCommand, void>
{
  constructor(
    private readonly billingService: BillingService,
    private readonly inventoryService: InventoryService,
  ) {}

  async execute(command: UpdateBillingCommand): Promise<void> {
    const { order_id, transaction_status } = command;

    try {
      const bill = await this.billingService.findByOrderId(order_id);

      const id = bill.getId();

      if (
        transaction_status === TransactionStatus.SETTLEMENT ||
        transaction_status === TransactionStatus.CAPTURE
      ) {
        await this.billingService.markAsPaid(id);
        await this.inventoryService.decreaseStockProduct(order_id);
      } else if (
        transaction_status === TransactionStatus.CANCEL ||
        transaction_status === TransactionStatus.DENY ||
        transaction_status === TransactionStatus.EXPIRE
      ) {
        await this.billingService.markAsFailed(id);
      }
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
