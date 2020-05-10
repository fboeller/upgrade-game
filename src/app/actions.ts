import { createAction, createReducer, on, props } from '@ngrx/store';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');

const _stateReducer = createReducer<GameState>(
  { timeActive: true },
  on(resume, state => ({ ...state, timeActive: true })),
  on(pause, state => ({ ...state, timeActive: false })),
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
