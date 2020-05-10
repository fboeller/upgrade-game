import { createAction, createReducer, on } from '@ngrx/store';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  properties: {
    salary: {
      value: number;
      upgradeCost: number;
    };
    businessIncome: {
      value: number;
      upgradeCost: number;
    };
  };
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const salaryUpgrade = createAction('[Upgrade] Salary');
export const work = createAction('[Funds] Work');
export const businessIncomeUpgrade = createAction('[Upgrade] Business Income');
export const businessIncome = createAction('[Funds] Business Income');

const initialState: GameState = {
  timeActive: false,
  funds: 0,
  properties: {
    salary: {
      value: 1,
      upgradeCost: 1,
    },
    businessIncome: {
      value: 0,
      upgradeCost: 10,
    },
  },
};

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(salaryUpgrade, (state) => ({
    ...state,
    funds: state.funds - state.properties.salary.upgradeCost,
    properties: {
      ...state.properties,
      salary: {
        upgradeCost: state.properties.salary.upgradeCost + 1,
        value: state.properties.salary.value + 1,
      }
    },
  })),
  on(work, (state) => ({
    ...state,
    funds: state.funds + state.properties.salary.value,
  })),
  on(businessIncomeUpgrade, (state) => ({
    ...state,
    funds: state.funds - state.properties.businessIncome.upgradeCost,
    timeActive: true,
    properties: {
      ...state.properties,
      businessIncome: {
        value: state.properties.businessIncome.value + 1,
        upgradeCost: state.properties.businessIncome.upgradeCost + 10,
      }
    },
  })),
  on(businessIncome, (state) => ({
    ...state,
    funds: state.funds + state.properties.businessIncome.value,
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
