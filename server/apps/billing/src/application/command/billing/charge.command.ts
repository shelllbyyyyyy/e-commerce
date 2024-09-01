import { ChargeDTO } from '@/root/order/dtos/charge.dto';

export class ChargeCommand {
  constructor(
    public charge: ChargeDTO,
    public access_token: string,
    public userId: string,
  ) {}
}
