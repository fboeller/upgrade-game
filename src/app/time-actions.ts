import { createAction, createReducer, on } from '@ngrx/store';

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');

const _timeReducer = createReducer(
  true,
  on(resume, _ => true),
  on(pause, _ => false)
);

export function timeReducer(state, action) {
  return _timeReducer(state, action);
}
