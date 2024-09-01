export class UpdateBillingCommand {
  constructor(
    public transaction_status: string,
    public order_id: string,
  ) {}
}
