export class Slug {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Slug cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
