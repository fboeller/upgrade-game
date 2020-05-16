import { GameState } from 'types/game-state.type';

export type Achievement =
  | 'firstIncome'
  | 'educated'
  | 'firstPromotion'
  | 'factoryOwner';

export const achievements: Achievement[] = [
  'firstIncome',
  'educated',
  'firstPromotion',
  'factoryOwner',
];

export interface AchievementType {
  displayName: string;
  icon: string;
  condition: (GameState) => boolean;
}

export const achievementMap: { [key: string]: AchievementType } = {
  firstIncome: {
    displayName: 'First Income',
    icon: 'fa-euro-sign',
    condition: (state: GameState) => state.funds > 0,
  },
  educated: {
    displayName: 'Educated',
    icon: 'fa-university',
    condition: (state: GameState) => state.properties?.education?.value > 0,
  },
  firstPromotion: {
    displayName: 'First Promotion',
    icon: 'fa-award',
    condition: (state: GameState) => state.properties?.salary?.value > 1,
  },
  factoryOwner: {
    displayName: 'Factory Owner',
    icon: 'fa-industry',
    condition: (state: GameState) =>
      state.properties?.businessIncome?.value > 0,
  },
};
