import { createSelector } from '@ngrx/store';
import { AppState } from '../actions/game.actions';
import { mapValues } from 'lodash/fp';
import { Property } from '../property.type';

export const selectGameState = (state: AppState) => state.gameState;

export const isUpgradePossible = createSelector(
  selectGameState,
  (state, { property }) => state.funds >= state.properties[property].upgradeCost
);

export const upgradesPossible = createSelector(
  selectGameState,
  (state) => mapValues((propertyState: Property) => state.funds >= propertyState.upgradeCost)(state.properties)
);
