import { createAction, props } from '@ngrx/store';
import { Property } from 'types/property.type';
import { GameState } from 'types/game-state.type';
import { Achievement } from 'types/achievement.type';
import { Powerup } from 'types/powerup.type';

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
export const activatePowerup = createAction(
  '[Powerup] Activated',
  props<{ powerup: Powerup }>()
);
export const deactivatePowerup = createAction(
  '[Powerup] Deactivated',
  props<{ powerup: Powerup }>()
);
