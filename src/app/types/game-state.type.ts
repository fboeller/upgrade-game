import { PropertyState } from './property-state.type';
import { plus, times } from './increase.type';
import { Achievement } from './achievement.type';

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: {
    education: PropertyState;
    salary: PropertyState;
    workEfficiency: PropertyState;
    businessIncome: PropertyState;
  };
  achievements: Achievement[];
}

export const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {
    education: {
      value: 0,
      upgradeEffect: plus(1),
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {},
      becameAffordable: false,
    },
    salary: {
      value: 1,
      upgradeEffect: plus(1),
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {
        education: 1,
      },
      becameAffordable: false,
    },
    workEfficiency: {
      value: 1000,
      upgradeEffect: times(0.8),
      upgradeCost: 2,
      upgradeCostIncrease: 2,
      upgradeConditions: {},
      becameAffordable: false,
    },
    businessIncome: {
      value: 0,
      upgradeEffect: plus(1),
      upgradeCost: 10,
      upgradeCostIncrease: 10,
      upgradeConditions: {},
      becameAffordable: false,
    },
  },
  achievements: [],
};
