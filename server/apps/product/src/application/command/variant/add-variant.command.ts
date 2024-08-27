export class AddProductVariantCommand {
  constructor(
    public readonly slug: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly sku: string,
    public readonly label: string,
    public readonly quantity: number,
    public readonly imageFile: Express.Multer.File,
    public readonly access_token: string,
  ) {}
}
