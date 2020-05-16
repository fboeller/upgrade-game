import { createSelector } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import { mapValues, every, toPairs, flow, pickBy } from 'lodash/fp';
import { PropertyState } from 'types/property-state.type';
import { valueOf } from 'types/property-type.type';
import { GameState } from 'types/game-state.type';
import { Property } from 'types/property.type';

export const selectGameState = (state: AppState) => state.gameState;

export const value = createSelector(
  selectGameState,
  (state: GameState, { property }) =>
    valueOf(property)(state.properties[property].level)
);

export const upgradesPossible = createSelector(selectGameState, (state) =>
  mapValues(
    (propertyState: PropertyState) =>
      state.funds >= propertyState.upgradeCost &&
      flow([
        toPairs,
        every(
          ([property, threshold]) =>
            valueOf(property)(state.properties[property].level) >= threshold
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
        (threshold: number, property: Property) =>
        valueOf(property)(state.properties[property].level) < threshold
      )(propertyState.upgradeConditions)
    )(state.properties)
);
