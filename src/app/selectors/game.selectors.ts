import { createSelector } from '@ngrx/store';
import { AppState } from '../actions/game.actions';

export const selectGameState = (state: AppState) => state.gameState;

export const isUpgradePossible = createSelector(
  selectGameState,
  (state, { property }) => state.funds >= state.properties[property].upgradeCost
);
