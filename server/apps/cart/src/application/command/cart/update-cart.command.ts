export class UpdateCartCommand {
  constructor(
    public cartItemId: string,
    public quantity: number,
    public access_token: string,
  ) {}
}
