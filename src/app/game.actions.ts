import { createAction, props } from '@ngrx/store';
import { Property } from 'types/property.type';
import { GameState } from 'types/game-state.type';
import { Achievement } from 'types/achievement.type';
import { Boost } from 'types/boost.type';

export interface AppState {
  gameState: GameState;
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const work = createAction('[Button] Work');
export const income = createAction(
  '[Funds] Income',
  props<{ property: 'salary' | 'businessIncome' }>()
);
export const upgrade = createAction(
  '[Property] Upgrade',
  props<{ property: Property }>()
);
export const propertyRevealed = createAction(
  '[Property] Revealed',
  props<{ property: Property }>()
);
export const achievementUnlocked = createAction(
  '[Achievement] Unlocked',
  props<{ achievement: Achievement }>()
);
export const activateBoost = createAction(
  '[Boost] Activated',
  props<{ boost: Boost }>()
);
export const deactivateBoost = createAction(
  '[Boost] Deactivated',
  props<{ boost: Boost }>()
);
