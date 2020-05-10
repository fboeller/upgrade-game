import { createAction, createReducer, on, props } from '@ngrx/store';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');

export const changeFunds = createAction(
  '[Funds] Change funds',
  props<{ amount: number }>()
);

const _stateReducer = createReducer<GameState>(
  { timeActive: true, funds: 0 },
  on(resume, state => ({ ...state, timeActive: true })),
  on(pause, state => ({ ...state, timeActive: false })),
  on(changeFunds, (state, { amount }) => ({ ...state, funds: state.funds + amount }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
