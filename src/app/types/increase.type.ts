export class Increase {
  constructor(
    public readonly type: 'plus' | 'times',
    public readonly value: number
  ) {}

  invoke(v: number): number {
    switch (this.type) {
      case 'plus':
        return v + this.value;
      case 'times':
        return v * this.value;
    }
  }

  toHtml(): string {
    switch (this.type) {
      case 'plus':
        return '+' + this.value;
      case 'times':
        return '&lowast;' + this.value;
    }
  }
}

export function plus(value: number): Increase {
  return new Increase('plus', value);
}

export function times(value: number): Increase {
  return new Increase('times', value);
}
