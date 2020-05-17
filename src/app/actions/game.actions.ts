import { createAction, createReducer, on, props } from '@ngrx/store';
import { Property } from 'types/property.type';
import { PropertyState } from 'types/property-state.type';
import { mapValues, concat, flow, toPairs, map, fromPairs } from 'lodash/fp';
import { GameState, initialState } from 'types/game-state.type';
import { Achievement } from 'types/achievement.type';
import { valueOf, upgradeCostOf } from 'types/property-type.type';

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
  '[Upgrade] Property',
  props<{ property: Property }>()
);
export const achievementUnlocked = createAction(
  '[Achievement] Unlocked',
  props<{ achievement: Achievement }>()
);

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(income, (state, { property: incomeProperty }) => ({
    ...state,
    funds: state.funds + valueOf(incomeProperty)(state.properties[incomeProperty].level),
    workActive: incomeProperty == 'salary' ? false : state.workActive,
    properties: flow([
      toPairs,
      map(([property, propertyState]) => [
        property,
        {
          ...propertyState,
          becameAffordable:
            propertyState.becameAffordable ||
            state.funds + valueOf(incomeProperty)(state.properties[incomeProperty].level) >=
              upgradeCostOf(property)(propertyState.level),
        },
      ]),
      fromPairs,
    ])(state.properties),
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds:
      state.funds - upgradeCostOf(property)(state.properties[property].level),
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties[property],
        level: state.properties[property].level + 1,
      },
    },
  })),
  on(achievementUnlocked, (state, { achievement }) => ({
    ...state,
    achievements: concat(achievement, state.achievements),
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
