import { PropertyState } from './property-state.type';
import { Achievement } from './achievement.type';

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: {
    salary: PropertyState;
    workEfficiency: PropertyState;
    education: PropertyState;
    businessIncome: PropertyState;
  };
  achievements: Achievement[];
}

export const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {
    salary: {
      level: 0,
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {},
      becameAffordable: false,
    },
    workEfficiency: {
      level: 0,
      upgradeCost: 3,
      upgradeCostIncrease: 3,
      upgradeConditions: {},
      becameAffordable: false,
    },
    education: {
      level: 0,
      upgradeCost: 10,
      upgradeCostIncrease: 10,
      upgradeConditions: {},
      becameAffordable: false,
    },
    businessIncome: {
      level: 0,
      upgradeCost: 100,
      upgradeCostIncrease: 100,
      upgradeConditions: {},
      becameAffordable: false,
    },
  },
  achievements: [],
};
