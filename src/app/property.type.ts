export interface PropertyState {
  value: number;
  upgradeEffect: number;
  upgradeCost: number;
  upgradeCostIncrease: number;
}

export interface PropertyType {
  displayName: string;
  upgradeText: string;
}

export const propertyTypes: { [property: string]: PropertyType } = {
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
