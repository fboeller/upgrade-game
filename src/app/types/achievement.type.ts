import { GameState } from '../types/game-state.type';
import { Observable, from } from 'rxjs';

export interface Achievement {
  name: string;
  condition: (GameState) => boolean;
}

export const achievements$: Observable<Achievement> = from([
  {
    name: 'First One At Work',
    condition: (state: GameState) => state.funds > 0,
  },
  {
    name: 'Educated',
    condition: (state: GameState) => state.properties.education.value > 0,
  },
]);
