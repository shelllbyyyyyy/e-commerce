import { Label } from '../values-object/label';
import { Price } from '../values-object/price';
import { Sku } from '../values-object/sku';

export class ProductVariant {
  constructor(
    private readonly id: string,
    private readonly sku: Sku,
    private readonly price: Price,
    private readonly imageUrl: string,
    private readonly label: Label,
    private readonly productId: string,
    private readonly name?: string,
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

  getSku(): Sku {
    return this.sku;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): Price {
    return this.price;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getLabel(): Label {
    return this.label;
  }

  getProductId(): string {
    return this.productId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static create({
    id,
    sku,
    price,
    imageUrl,
    label,
    productId,
  }: {
    id: string;
    sku: string;
    price: number;
    imageUrl: string;
    label: string;
    productId: string;
  }): ProductVariant {
    return new ProductVariant(
      id,
      new Sku(sku),
      new Price(price),
      imageUrl,
      new Label(label),
      productId,
    );
  }

  updateVariant({
    price,
    sku,
    imageUrl,
    label,
  }: {
    price?: number;
    sku?: string;
    imageUrl?: string;
    label?: string;
  }): ProductVariant {
    return new ProductVariant(
      this.id,
      sku ? new Sku(sku) : this.sku,
      price ? new Price(price) : this.price,
      imageUrl ? imageUrl : undefined,
      label ? new Label(label) : this.label,
      this.productId,
    );
  }
}
