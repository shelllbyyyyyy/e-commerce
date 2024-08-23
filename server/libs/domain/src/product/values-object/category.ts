export class Category {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Category cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
