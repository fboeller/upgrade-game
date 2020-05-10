import { createAction, createReducer, on } from '@ngrx/store';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  salaryUpgradeCost: number;
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const salaryUpgrade = createAction('[Upgrade] Salary');

const _stateReducer = createReducer<GameState>(
  { timeActive: true, salaryUpgradeCost: 3 },
  on(resume, state => ({ ...state, timeActive: true })),
  on(pause, state => ({ ...state, timeActive: false })),
  on(salaryUpgrade, state => ({ ...state, salaryUpgradeCost: state.salaryUpgradeCost + 1 }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
