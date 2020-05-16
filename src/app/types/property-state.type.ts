export interface PropertyState {
  level: number;
  value: number;
  upgradeCost: number;
  upgradeCostIncrease: number;
  upgradeConditions: { [property: string]: number };
  becameAffordable: boolean;
}
