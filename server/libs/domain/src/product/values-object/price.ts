export class Price {
  constructor(private readonly value: number) {
    if (value < 0) throw new Error('Price cannot be negative');
  }

  getValue(): number {
    return this.value;
  }
}
