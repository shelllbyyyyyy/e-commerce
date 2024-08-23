export class Sku {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Sku cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
