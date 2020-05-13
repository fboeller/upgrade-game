import { GameState } from '../actions/game.actions';
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
]);
