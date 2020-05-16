import { propertyTypes } from './property-type.type';
import { Property } from './property.type';

export interface PropertyState {
  level: number;
  upgradeCost: number;
  upgradeCostIncrease: number;
  upgradeConditions: { [property: string]: number };
  becameAffordable: boolean;
}
