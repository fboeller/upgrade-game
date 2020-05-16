import { PropertyState } from './property-state.type';
import { plus, times } from './increase.type';
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
      level: 1,
      value: 1,
      upgradeEffect: plus(1),
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {},
      becameAffordable: false,
    },
    workEfficiency: {
      level: 1,
      value: 1000,
      upgradeEffect: times(0.8),
      upgradeCost: 3,
      upgradeCostIncrease: 3,
      upgradeConditions: {},
      becameAffordable: false,
    },
    education: {
      level: 1,
      value: 0,
      upgradeEffect: plus(1),
      upgradeCost: 10,
      upgradeCostIncrease: 10,
      upgradeConditions: {},
      becameAffordable: false,
    },
    businessIncome: {
      level: 1,
      value: 0,
      upgradeEffect: plus(1),
      upgradeCost: 100,
      upgradeCostIncrease: 100,
      upgradeConditions: {},
      becameAffordable: false,
    },
  },
  achievements: [],
};
