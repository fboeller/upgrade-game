import { createAction, createReducer, on, props } from '@ngrx/store';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

export interface AppState {
  gameState: GameState;
}

export interface Property {
  value: number;
  upgradeCost: number;
  upgradeCostIncrease: number;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  properties: {
    salary: Property;
    businessIncome: Property;
  };
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const work = createAction('[Funds] Work');
export const businessIncome = createAction('[Funds] Business Income');
export const upgrade = createAction('[Upgrade] Property', props<{ property: 'salary' | 'businessIncome' }>());

const initialState: GameState = {
  timeActive: false,
  funds: 0,
  properties: {
    salary: {
      value: 1,
      upgradeCost: 1,
      upgradeCostIncrease: 1
    },
    businessIncome: {
      value: 0,
      upgradeCost: 10,
      upgradeCostIncrease: 10
    },
  },
};

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(work, (state) => ({
    ...state,
    funds: state.funds + state.properties.salary.value,
  })),
  on(businessIncome, (state) => ({
    ...state,
    funds: state.funds + state.properties.businessIncome.value,
  })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds: state.funds - state.properties[property].upgradeCost,
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties[property],
        value: state.properties[property].value + 1,
        upgradeCost: state.properties[property].upgradeCost + state.properties[property].upgradeCostIncrease,
      }
    },
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
