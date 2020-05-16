import { Property } from './property.type';

type Level = number;

export interface PropertyType {
  displayName: string;
  upgradeText: string;
  valueOfLevel: (Level) => number;
  upgradeCostFromLevel: (Level) => number;
  upgradeConditionsFromLevel: (Level) => { [property: string]: number };
}

export const valueOf = (property: Property) => (level: number): number =>
  propertyTypes[property].valueOfLevel(level);

export const upgradeCostOf = (property: Property) => (level: number): number =>
  propertyTypes[property].upgradeCostFromLevel(level);

export const upgradeConditionsOf = (property: Property) => (
  level: number
): { [property: string]: number } =>
  propertyTypes[property].upgradeConditionsFromLevel(level);

export const propertyTypes: { [property: string]: PropertyType } = {
  salary: {
    displayName: 'Salary',
    upgradeText: 'Ask for raise',
    valueOfLevel: (level) => level + 1,
    upgradeCostFromLevel: (level) => level + 1,
    upgradeConditionsFromLevel: (level) => ({
      education: level <= 4 ? 0 : level - 4,
    }),
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase',
    valueOfLevel: (level) => 1000 * Math.pow(0.8, level),
    upgradeCostFromLevel: (level) => (level + 1) * 3,
    upgradeConditionsFromLevel: (level) => ({}),
  },
  education: {
    displayName: 'Education',
    upgradeText: 'Study',
    valueOfLevel: (level) => level,
    upgradeCostFromLevel: (level) => (level + 1) * 10,
    upgradeConditionsFromLevel: (level) => ({}),
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy',
    valueOfLevel: (level) => level,
    upgradeCostFromLevel: (level) => (level + 1) * 100,
    upgradeConditionsFromLevel: (level) => ({}),
  },
};
