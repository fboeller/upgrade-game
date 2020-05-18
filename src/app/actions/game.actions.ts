import { createAction, createReducer, on, props } from '@ngrx/store';
import { Property } from 'types/property.type';
import { concat } from 'lodash/fp';
import { GameState, initialState } from 'types/game-state.type';
import { Achievement } from 'types/achievement.type';
import { valueOf, upgradeCostOf } from 'types/property-type.type';
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

const stateReducer0 = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(income, (state, { property }) => ({
    ...state,
    funds: state.funds + valueOf(property)(state.properties?.[property]?.level),
    workActive: property === 'salary' ? false : state.workActive,
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds:
      state.funds - upgradeCostOf(property)(state.properties?.[property]?.level),
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties?.[property],
        level: (state.properties?.[property]?.level || 0) + 1,
      },
    },
  })),
  on(propertyRevealed, (state, { property }) => ({
    ...state,
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties?.[property],
        becameAffordable: true,
      },
    },
  })),
  on(achievementUnlocked, (state, { achievement }) => ({
    ...state,
    achievements: concat(achievement, state.achievements),
  })),
  on(activatePowerup, (state, { powerup }) => ({
    ...state,
    powerups: {
      ...state.powerups,
      [powerup]: (state.powerups?.[powerup] || 0) + 1
    },
  })),
  on(deactivatePowerup, (state, { powerup }) => ({
    ...state,
    powerups: {
      ...state.powerups,
      [powerup]: Math.max(0, state.powerups?.[powerup] - 1)
    },
  })),
);

export function stateReducer(state, action) {
  return stateReducer0(state, action);
}
