import { createReducer, on } from '@ngrx/store';
import { initialState } from 'types/game-state.type';
import {
  resume,
  pause,
  income,
  work,
  upgrade,
  propertyRevealed,
  achievementUnlocked,
  activatePowerup,
  deactivatePowerup,
} from './game.actions';
import { Selectors } from 'selectors/game.selectors';
import { PowerupSelectors } from 'selectors/powerup.selectors';
import { concat } from 'lodash/fp';

const stateReducer0 = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(income, (state, { property }) => ({
    ...state,
    funds: state.funds + Selectors.value(state, { property }),
    workActive: property === 'salary' ? false : state.workActive,
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds: state.funds - Selectors.upgradeCost(state, { property }),
    properties: {
      ...state.properties,
      [property]: Selectors.level(state, { property }) + 1,
    },
  })),
  on(propertyRevealed, (state, { property }) => ({
    ...state,
    properties: {
      ...state.properties,
      [property]: 0,
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
      [powerup]: PowerupSelectors.powerup(state, { powerup }) + 1,
    },
  })),
  on(deactivatePowerup, (state, { powerup }) => ({
    ...state,
    powerups: {
      ...state.powerups,
      [powerup]: PowerupSelectors.powerup(state, { powerup }) - 1 || undefined,
    },
  }))
);

export function stateReducer(state, action) {
  return stateReducer0(state, action);
}
