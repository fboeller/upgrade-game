import { GameState } from 'types/game-state.type';
import { work } from 'actions/game.actions';
import { Selectors } from 'selectors/game.selectors';

export type Achievement =
  | 'firstIncome'
  | 'educated'
  | 'firstPromotion'
  | 'factoryOwner'
  | 'workHorse';

export const achievements: Achievement[] = [
  'firstIncome',
  'educated',
  'firstPromotion',
  'factoryOwner',
  'workHorse',
];

export type ActionCounts = { [action: string]: number };

export interface AchievementType {
  displayName: string;
  icon: string;
  stateCondition: (GameState) => boolean;
  actionCondition: (ActionCounts) => boolean;
}

export const achievementMap: { [key: string]: AchievementType } = {
  firstIncome: {
    displayName: 'First Income',
    icon: 'fa-euro-sign',
    stateCondition: (state: GameState) => state.funds > 0,
    actionCondition: () => false,
  },
  educated: {
    displayName: 'Educated',
    icon: 'fa-university',
    stateCondition: (state: GameState) =>
      Selectors.value(state, { property: 'education' }) > 0,
    actionCondition: () => false,
  },
  firstPromotion: {
    displayName: 'First Promotion',
    icon: 'fa-award',
    stateCondition: (state: GameState) =>
      Selectors.value(state, { property: 'salary' }) > 1,
    actionCondition: () => false,
  },
  factoryOwner: {
    displayName: 'Factory Owner',
    icon: 'fa-industry',
    stateCondition: (state: GameState) =>
      Selectors.value(state, { property: 'businessIncome' }) > 0,
    actionCondition: () => false,
  },
  workHorse: {
    displayName: 'Work Horse',
    icon: 'fa-horse',
    stateCondition: () => false,
    actionCondition: (actionCounts: ActionCounts) =>
      actionCounts[work.type] >= 5,
  },
};
