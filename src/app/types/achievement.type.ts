import { GameState } from 'types/game-state.type';
import { work } from 'actions/game.actions';
import { propertyTypes, valueOf } from './property-type.type';

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
      valueOf('education')(state.properties?.education?.level) > 0,
    actionCondition: () => false,
  },
  firstPromotion: {
    displayName: 'First Promotion',
    icon: 'fa-award',
    stateCondition: (state: GameState) =>
      valueOf('salary')(state.properties?.salary?.level) > 1,
    actionCondition: () => false,
  },
  factoryOwner: {
    displayName: 'Factory Owner',
    icon: 'fa-industry',
    stateCondition: (state: GameState) =>
      valueOf('businessIncome')(state.properties?.businessIncome?.level) > 0,
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
