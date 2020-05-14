import { GameState } from '../types/game-state.type';
import { Observable, from } from 'rxjs';

export interface Achievement {
  name: string;
  icon: string;
  condition: (GameState) => boolean;
}

export const achievements$: Observable<Achievement> = from([
  {
    name: 'First Income',
    icon: 'fa-euro-sign',
    condition: (state: GameState) => state.funds > 0,
  },
  {
    name: 'Educated',
    icon: 'fa-university',
    condition: (state: GameState) => state.properties.education.value > 0,
  },
]);
