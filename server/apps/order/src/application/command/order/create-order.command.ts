export class CreateOrderCommand {
  constructor(
    public userId: string,
    public productId: string[],
    public quantity: number,
  ) {}
}
