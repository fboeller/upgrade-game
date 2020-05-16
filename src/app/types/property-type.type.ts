export interface PropertyType {
  displayName: string;
  upgradeText: string;
}

export const propertyTypes: { [property: string]: PropertyType } = {
  salary: {
    displayName: 'Salary',
    upgradeText: 'Ask for raise',
  },
  workEfficiency: {
    displayName: 'Work Efficiency',
    upgradeText: 'Increase',
  },
  education: {
    displayName: 'Education',
    upgradeText: 'Study',
  },
  businessIncome: {
    displayName: 'Factories',
    upgradeText: 'Buy',
  },
};
