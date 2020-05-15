import { GameState } from 'types/game-state.type';
import { Observable, from } from 'rxjs';

export interface Achievement {
  name: string;
  icon: string;
  condition: (GameState) => boolean;
}

export const achievements: Achievement[] = [
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
  {
    name: 'First Promotion',
    icon: 'fa-award',
    condition: (state: GameState) => state.properties.salary.value > 1,
  },
  {
    name: 'Factory Owner',
    icon: 'fa-industry',
    condition: (state: GameState) => state.properties.businessIncome.value > 0,
  },
];

export const achievements$: Observable<Achievement> = from(achievements);
