export class AddProductCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly slug: string,
    public readonly imageUrl: string[],
    public readonly sku: string,
    public readonly category: string,
    public readonly label: string,
    public readonly imageFile: Express.Multer.File,
  ) {}
}
