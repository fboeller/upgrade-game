import { createAction, createReducer, on, props } from '@ngrx/store';
import { PropertyState } from '../property.type';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: {
    salary: PropertyState;
    workEfficiency: PropertyState;
    businessIncome: PropertyState;
  };
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
  props<{ property: 'salary' | 'businessIncome' | 'workEfficiency' }>()
);

const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {
    salary: {
      value: 1,
      upgradeEffect: 1,
      upgradeCost: 1,
      upgradeCostIncrease: 1,
    },
    workEfficiency: {
      value: 1000,
      upgradeEffect: -50,
      upgradeCost: 2,
      upgradeCostIncrease: 2,
    },
    businessIncome: {
      value: 0,
      upgradeEffect: 1,
      upgradeCost: 10,
      upgradeCostIncrease: 10,
    },
  },
};

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(income, (state, { property }) => ({
    ...state,
    funds: state.funds + state.properties[property].value,
    workActive: property == 'salary' ? false : state.workActive,
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds: state.funds - state.properties[property].upgradeCost,
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties[property],
        value:
          state.properties[property].value +
          state.properties[property].upgradeEffect,
        upgradeCost:
          state.properties[property].upgradeCost +
          state.properties[property].upgradeCostIncrease,
      },
    },
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
