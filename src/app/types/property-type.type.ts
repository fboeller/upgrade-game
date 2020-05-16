import { Increase, plus, times } from './increase.type';
import { Property } from './property.type';

type Level = number;

export interface PropertyType {
  displayName: string;
  upgradeText: string;
  valueOfLevel: (Level) => number;
  upgradeEffect: Increase;
}

export const valueOf = (property: Property) => (level: number): number =>
  propertyTypes[property].valueOfLevel(level);

export const propertyTypes: { [property: string]: PropertyType } = {
  salary: {
    displayName: 'Salary',
    upgradeText: 'Ask for raise',
    valueOfLevel: (level) => level + 1,
    upgradeEffect: plus(1),
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase',
    valueOfLevel: (level) => 1000 * Math.pow(0.8, level),
    upgradeEffect: times(0.8),
  },
  education: {
    displayName: 'Education',
    upgradeText: 'Study',
    valueOfLevel: (level) => level,
    upgradeEffect: plus(1),
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy',
    valueOfLevel: (level) => level,
    upgradeEffect: plus(1),
  },
};
