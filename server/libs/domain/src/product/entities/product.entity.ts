import { Category } from '../values-object/category';
import { Description } from '../values-object/description';
import { Price } from '../values-object/price';
import { Slug } from '../values-object/slug';
import { ProductVariant } from './product-variant.entity';

export class Product {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly price: Price,
    private readonly imageUrl: string[] = [],
    private readonly slug: Slug,
    private readonly description: Description,
    private readonly category: Category,
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

  getPrice(): Price {
    return this.price;
  }

  getImageUrl(): string[] {
    return this.imageUrl;
  }

  getSlug(): Slug {
    return this.slug;
  }

  getDescription(): Description {
    return this.description;
  }

  getCategory(): Category {
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

  static create({
    id,
    name,
    price,
    imageUrl,
    slug,
    description,
    category,
    sku,
    label,
  }: {
    id: string;
    name: string;
    price: number;
    imageUrl: string[];
    slug: string;
    description: string;
    category: string;
    sku: string;
    label: string;
  }): Product {
    return new Product(
      id,
      name,
      new Price(price),
      imageUrl,
      new Slug(slug),
      new Description(description),
      new Category(category),
      [
        ProductVariant.create({
          id,
          sku,
          price,
          imageUrl: imageUrl[0],
          label,
          productId: id,
        }),
      ],
    );
  }

  updateProduct({
    name,
    description,
    price,
  }: {
    name?: string;
    description?: string;
    price?: number;
  }): Product {
    return new Product(
      this.id,
      name || this.name,
      price ? new Price(price) : this.price,
      this.imageUrl,
      this.slug,
      description ? new Description(description) : this.description,
      this.category,
      this.variant,
    );
  }
}
