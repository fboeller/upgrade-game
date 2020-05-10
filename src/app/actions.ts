import { createAction, createReducer, on } from '@ngrx/store';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  properties: {
    salaryUpgradeCost: number;
    salary: number;
    businessIncome: number;
    businessIncomeUpgradeCost: number;
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
    salaryUpgradeCost: 1,
    salary: 1,
    businessIncome: 0,
    businessIncomeUpgradeCost: 10,
  },
};

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(salaryUpgrade, (state) => ({
    ...state,
    funds: state.funds - state.properties.salaryUpgradeCost,
    salaryUpgradeCost: state.properties.salaryUpgradeCost + 1,
    salary: state.properties.salary + 1,
  })),
  on(work, (state) => ({
    ...state,
    funds: state.funds + state.properties.salary,
  })),
  on(businessIncomeUpgrade, (state) => ({
    ...state,
    funds: state.funds - state.properties.businessIncomeUpgradeCost,
    businessIncomeUpgradeCost: state.properties.businessIncomeUpgradeCost + 10,
    businessIncome: state.properties.businessIncome + 1,
    timeActive: true,
  })),
  on(businessIncome, (state) => ({
    ...state,
    funds: state.funds + state.properties.businessIncome,
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
