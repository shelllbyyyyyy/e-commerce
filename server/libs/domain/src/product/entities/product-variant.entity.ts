export class ProductVariant {
  constructor(
    private readonly id: string,
    private readonly sku: string,
    private readonly price: number,
    private readonly imageUrl: string,
    private readonly label: string,
    private readonly productId: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.sku = sku;
    this.price = price;
    this.imageUrl = imageUrl;
    this.label = label;
    this.productId = productId;
  }

  getId(): string {
    return this.id;
  }

  getSku(): string {
    return this.sku;
  }

  getPrice(): number {
    return this.price;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getLabel(): string {
    return this.label;
  }

  getproduct(): string {
    return this.productId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateVariant({
    price,
    sku,
    imageUrl,
    label,
  }: {
    price: number;
    sku: string;
    imageUrl: string;
    label: string;
  }): ProductVariant {
    return new ProductVariant(
      this.id,
      sku,
      price,
      imageUrl,
      label,
      this.productId,
    );
  }
}
