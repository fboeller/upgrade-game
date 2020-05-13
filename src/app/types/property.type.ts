export type Property =
  | 'education'
  | 'salary'
  | 'businessIncome'
  | 'workEfficiency';

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

export interface PropertyState {
  value: number;
  upgradeEffect: Increase;
  upgradeCost: number;
  upgradeCostIncrease: number;
  upgradeConditions: { [property: string]: number };
  becameAffordable: boolean;
}

export interface PropertyType {
  displayName: string;
  upgradeText: string;
}

export const propertyTypes: { [property: string]: PropertyType } = {
  education: {
    displayName: 'Education',
    upgradeText: 'Learn',
  },
  salary: {
    displayName: 'Salary',
    upgradeText: 'Promote',
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase',
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy',
  },
};
