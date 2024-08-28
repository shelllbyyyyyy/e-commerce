export class CreateOrderCommand {
  constructor(
    public userId: string,
    public quantity: number,
    public access_token: string,
    public cartItemId?: string[],
    public productId?: string,
  ) {}
}
