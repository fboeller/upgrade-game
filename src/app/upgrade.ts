export interface Upgrade {
  property: 'Salary' | 'Factory';
  cost: number;
  update: (number) => number;
}
