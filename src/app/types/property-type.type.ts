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
