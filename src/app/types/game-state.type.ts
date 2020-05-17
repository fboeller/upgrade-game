import { PropertyState } from './property-state.type';
import { Achievement } from './achievement.type';

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: { [property: string]: PropertyState };
  achievements: Achievement[];
  powerups: { [powerup: string]: number };
}

export const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {},
  achievements: [],
  powerups: {},
};
