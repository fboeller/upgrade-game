import { GameState } from 'types/game-state.type';
import { Observable, from } from 'rxjs';
import { keys } from 'lodash/fp';

export interface Achievement {
  name: string;
  icon: string;
  condition: (GameState) => boolean;
}

export const achievementMap: { [key: string]: Achievement } = {
  firstIncome: {
    name: 'First Income',
    icon: 'fa-euro-sign',
    condition: (state: GameState) => state.funds > 0,
  },
  educated: {
    name: 'Educated',
    icon: 'fa-university',
    condition: (state: GameState) => state.properties?.education?.value > 0,
  },
  firstPromotion: {
    name: 'First Promotion',
    icon: 'fa-award',
    condition: (state: GameState) => state.properties?.salary?.value > 1,
  },
  factoryOwner: {
    name: 'Factory Owner',
    icon: 'fa-industry',
    condition: (state: GameState) => state.properties?.businessIncome?.value > 0,
  },
};

export const achievements: string[] = keys(achievementMap);

export const achievements$: Observable<string> = from(achievements);
