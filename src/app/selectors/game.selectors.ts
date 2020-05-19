import { createSelector } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import { every, toPairs, flow, pickBy, map, fromPairs } from 'lodash/fp';
import {
  upgradeCostOf,
  upgradeConditionsOf,
  propertyTypes,
} from 'types/property-type.type';
import { GameState } from 'types/game-state.type';
import { Property } from 'types/property.type';

export const selectGameState = (state: AppState) => state.gameState;
export const selectProperties = (state: GameState) => state.properties;

export class Selectors {
  static readonly level = createSelector(
    selectProperties,
    (properties, { property }) => properties?.[property]?.level || 0
  );

  static readonly value = createSelector(
    Selectors.level,
    (level, { property }) => propertyTypes[property].valueOfLevel(level)
  );

  static readonly upgradeCost = createSelector(
    Selectors.level,
    (level, { property }) => propertyTypes[property].upgradeCostFromLevel(level)
  );

  static readonly powerup = createSelector(
    selectGameState,
    (state: GameState, { powerup }) => state.powerups?.[powerup] || 0
  );

  static readonly workDuration = createSelector(
    selectGameState,
    (state: GameState) => {
      const workEfficiency = Selectors.value(state, {
        property: 'workEfficiency',
      });
      const coffeeCount = state?.powerups?.coffee || 0;
      return workEfficiency / Math.pow(2, coffeeCount);
    }
  );

  static readonly upgradesPossible = createSelector(
    selectGameState,
    (state: GameState) =>
      flow([
        toPairs,
        map(([property, propertyState]) => [
          property,
          state.funds >= upgradeCostOf(property)(propertyState.level) &&
            flow([
              toPairs,
              every(
                ([conditionProperty, threshold]) =>
                  Selectors.value(state, { property: conditionProperty }) >=
                  threshold
              ),
            ])(upgradeConditionsOf(property)(propertyState.level)),
        ]),
        fromPairs,
      ])(state.properties)
  );

  static readonly filterBecameAffordable = createSelector(
    selectGameState,
    (state, { properties }) =>
      properties.filter(
        (property) => state.properties?.[property]?.becameAffordable || false
      )
  );

  static readonly unfulfiledUpgradeConditions = createSelector(
    selectGameState,
    (state) =>
      flow([
        toPairs,
        map(([property, propertyState]) => [
          property,
          pickBy(
            (threshold: number, conditionProperty: Property) =>
              Selectors.value(state, { property: conditionProperty }) <
              threshold
          )(upgradeConditionsOf(property)(propertyState.level)),
        ]),
        fromPairs,
      ])(state.properties)
  );
}
