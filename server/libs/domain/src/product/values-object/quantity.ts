export class Quantity {
  constructor(private readonly value: number) {
    if (value < 0) throw new Error('Quantity cannot be negative');
  }

  getValue(): number {
    return this.value;
  }
}
