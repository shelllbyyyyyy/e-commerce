import { CategoriesOnProduct } from './categories-on-product.entity';

export class Category {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly categoriesOnProduct: CategoriesOnProduct[],
  ) {
    this.id = id;
    this.name = name;
    this.categoriesOnProduct = categoriesOnProduct;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCatregoriesOnProduct(): CategoriesOnProduct[] {
    return this.categoriesOnProduct;
  }
}
