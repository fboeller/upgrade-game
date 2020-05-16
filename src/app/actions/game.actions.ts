import { createAction, createReducer, on, props } from '@ngrx/store';
import { Property } from 'types/property.type';
import { PropertyState } from 'types/property-state.type';
import { mapValues, concat } from 'lodash/fp';
import { GameState, initialState } from 'types/game-state.type';
import { Achievement } from 'types/achievement.type';

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
  on(income, (state, { property }) => ({
    ...state,
    funds: state.funds + state.properties[property].value,
    workActive: property == 'salary' ? false : state.workActive,
    properties: mapValues((propertyState: PropertyState) => ({
      ...propertyState,
      becameAffordable:
        propertyState.becameAffordable ||
        state.funds + state.properties[property].value >=
          propertyState.upgradeCost,
    }))(state.properties),
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds: state.funds - state.properties[property].upgradeCost,
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties[property],
        value: state.properties[property].upgradeEffect.invoke(
          state.properties[property].value
        ),
        upgradeCost:
          state.properties[property].upgradeCost +
          state.properties[property].upgradeCostIncrease,
        upgradeConditions: mapValues((threshold: number) => threshold + 1)(
          state.properties[property].upgradeConditions
        ),
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
