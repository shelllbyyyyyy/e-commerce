import { CategoriesOnProduct } from './categories-on-product.entity';
import { ProductVariant } from './product-variant.entity';

export class Product {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly price: number,
    private readonly imageUrl: string[] = [],
    private readonly slug: string,
    private readonly description: string,
    private readonly category: string,
    private readonly variant: ProductVariant[] = [],
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.slug = slug;
    this.description = description;
    this.category = category;
    this.variant = variant;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getImageUrl(): string[] {
    return this.imageUrl;
  }

  getSlug(): string {
    return this.slug;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return this.category;
  }

  getVariant(): ProductVariant[] {
    return this.variant;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateProduct({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }): Product {
    return new Product(
      this.id,
      name || this.name,
      price || this.price,
      this.imageUrl,
      this.slug,
      description || this.description,
      this.category,
      this.variant,
    );
  }
}
