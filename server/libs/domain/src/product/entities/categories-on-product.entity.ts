import { Category } from './category.entity';
import { Product } from './product.entity';

export class CategoriesOnProduct {
  constructor(
    private readonly category: Category,
    private readonly product: Product,
  ) {
    this.category = category;
    this.product = product;
  }

  getCategory(): Category {
    return this.category;
  }

  getProduct(): Product {
    return this.product;
  }
}
