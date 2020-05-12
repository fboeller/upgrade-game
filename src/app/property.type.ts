export type Property = 'education' | 'salary' | 'businessIncome' | 'workEfficiency';

export interface Increase {
  type: 'plus';
  value: number;
}

export function plus(value: number): Increase {
  return { type: 'plus', value }
}

export function toFunction(increase: Increase): (number) => number {
  switch(increase.type) {
    case 'plus': return v => v + increase.value;
  }
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
    upgradeText: 'Learn'
  },
  salary: {
    displayName: 'Salary',
    upgradeText: 'Promote'
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase'
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy'
  }
}
