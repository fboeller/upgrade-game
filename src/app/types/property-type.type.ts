import { Increase, plus, times } from './increase.type';

export interface PropertyType {
  displayName: string;
  upgradeText: string;
  upgradeEffect: Increase,
}

export const propertyTypes: { [property: string]: PropertyType } = {
  salary: {
    displayName: 'Salary',
    upgradeText: 'Ask for raise',
    upgradeEffect: plus(1),
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase',
    upgradeEffect: times(0.8),
  },
  education: {
    displayName: 'Education',
    upgradeText: 'Study',
    upgradeEffect: plus(1),
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy',
    upgradeEffect: plus(1),
  },
};
