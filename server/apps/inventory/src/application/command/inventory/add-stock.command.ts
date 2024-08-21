export class AddStockCommand {
  constructor(
    public productId: string,
    public quantity: number,
  ) {}
}
