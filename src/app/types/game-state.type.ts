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
  powerups: { [powerup: string]: number };
}

export const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {
    salary: {
      level: 0,
      becameAffordable: false,
    },
    workEfficiency: {
      level: 0,
      becameAffordable: false,
    },
    education: {
      level: 0,
      becameAffordable: false,
    },
    businessIncome: {
      level: 0,
      becameAffordable: false,
    },
  },
  achievements: [],
  powerups: {},
};
