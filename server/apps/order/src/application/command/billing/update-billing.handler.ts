import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { UpdateBillingCommand } from './update-billing.command';
import { BillingService } from '../../service/billing.service';

@CommandHandler(UpdateBillingCommand)
export class UpdateBillingHandler
  implements ICommandHandler<UpdateBillingCommand, any>
{
  constructor(private readonly billingService: BillingService) {}

  async execute(command: UpdateBillingCommand): Promise<any> {
    const { order_id, transaction_status } = command;

    try {
      return await this.billingService.handleNotification({
        transaction_status,
        order_id,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
