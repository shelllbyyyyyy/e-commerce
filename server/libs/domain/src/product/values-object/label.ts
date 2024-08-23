export class Label {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Label cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
