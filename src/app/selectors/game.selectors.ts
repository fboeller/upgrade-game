import { createSelector } from '@ngrx/store';
import { AppState } from '../actions/game.actions';
import { mapValues, every, toPairs, flow, pickBy } from 'lodash/fp';
import { PropertyState } from '../property.type';

export const selectGameState = (state: AppState) => state.gameState;

export const upgradesPossible = createSelector(selectGameState, (state) =>
  mapValues(
    (propertyState: PropertyState) =>
      state.funds >= propertyState.upgradeCost &&
      flow([
        toPairs,
        every(
          ([property, threshold]) =>
            state.properties[property].value >= threshold
        ),
      ])(propertyState.upgradeConditions)
  )(state.properties)
);

export const filterBecameAffordable = createSelector(
  selectGameState,
  (state, { properties }) =>
    properties.filter((property) => state.properties[property].becameAffordable)
);

export const unfulfiledUpgradeConditions = createSelector(
  selectGameState,
  (state) =>
    mapValues((propertyState: PropertyState) =>
      pickBy(
        (threshold: number, property) =>
          state.properties[property].value < threshold
      )(propertyState.upgradeConditions)
    )(state.properties)
);
