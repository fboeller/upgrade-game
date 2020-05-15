import { Increase } from "./increase.type";

export interface PropertyState {
  value: number;
  upgradeEffect: Increase;
  upgradeCost: number;
  upgradeCostIncrease: number;
  upgradeConditions: { [property: string]: number };
  becameAffordable: boolean;
}
