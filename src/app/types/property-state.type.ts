export interface PropertyState {
  level: number;
  upgradeConditions: { [property: string]: number };
  becameAffordable: boolean;
}
