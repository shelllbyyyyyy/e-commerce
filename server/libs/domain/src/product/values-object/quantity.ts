export class Quantity {
  constructor(private readonly value: number) {
    if (value <= 0) throw new Error('Quantity must be greater than zero');
  }

  getValue(): number {
    return this.value;
  }
}
