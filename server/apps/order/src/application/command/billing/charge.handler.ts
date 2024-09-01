import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { ChargeCommand } from './charge.command';
import { BillingService } from '../../service/billing.service';

@CommandHandler(ChargeCommand)
export class ChargeHandler implements ICommandHandler<ChargeCommand, any> {
  constructor(private readonly billingService: BillingService) {}

  async execute(command: ChargeCommand): Promise<any> {
    const { charge, access_token } = command;

    try {
      return await this.billingService.handleCharge(charge, access_token);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
