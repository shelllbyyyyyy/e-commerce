export class AddToCartCommand {
  constructor(
    public userId: string,
    public productId: string,
    public quantity: number,
    public access_token: string,
  ) {}
}
