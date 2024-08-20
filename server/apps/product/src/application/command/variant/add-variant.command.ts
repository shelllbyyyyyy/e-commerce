export class AddProductVariantCommand {
  constructor(
    public readonly slug: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly sku: string,
    public readonly label: string,
    public readonly imageFile: Express.Multer.File,
  ) {}
}
