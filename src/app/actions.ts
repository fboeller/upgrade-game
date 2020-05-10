import { createAction, createReducer, on } from '@ngrx/store';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  salaryUpgradeCost: number;
  salary: number;
  businessIncome: number;
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const salaryUpgrade = createAction('[Upgrade] Salary');
export const work = createAction('[Funds] Work');
export const businessIncomeUpgrade = createAction('[Upgrade] Business Income');
export const businessIncome = createAction('[Funds] Business Income');

const _stateReducer = createReducer<GameState>(
  {
    timeActive: false,
    funds: 0,
    salaryUpgradeCost: 3,
    salary: 1,
    businessIncome: 0,
  },
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(salaryUpgrade, (state) => ({
    ...state,
    funds: state.funds - state.salaryUpgradeCost,
    salaryUpgradeCost: state.salaryUpgradeCost + 1,
    salary: state.salary + 1,
  })),
  on(work, (state) => ({
    ...state,
    funds: state.funds + state.salary,
  })),
  on(businessIncomeUpgrade, (state) => ({
    ...state,
    funds: state.funds - 10,
    businessIncome: state.businessIncome + 1,
    timeActive: true
  })),
  on(businessIncome, (state) => ({
    ...state,
    funds: state.funds + state.businessIncome,
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
