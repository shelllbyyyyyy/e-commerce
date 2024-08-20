export class UpdateProductVariantCommand {
  constructor(
    public id?: string,
    public price?: number,
    public imageUrl?: string,
    public sku?: string,
    public label?: string,
    public imageFile?: Express.Multer.File,
  ) {}
}
