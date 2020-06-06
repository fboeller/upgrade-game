import { Achievement } from './achievement.type';

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: { [property: string]: number };
  achievements: Achievement[];
  boosts: { [boost: string]: number };
}

export const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {},
  achievements: [],
  boosts: {},
};
