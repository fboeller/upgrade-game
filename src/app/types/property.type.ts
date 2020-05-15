import { Increase } from './increase.type';

export type Property =
  | 'education'
  | 'salary'
  | 'businessIncome'
  | 'workEfficiency';

export const personalProperties: Property[] = [
  'education',
  'salary',
  'workEfficiency',
];
export const businessProperties: Property[] = ['businessIncome'];

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
