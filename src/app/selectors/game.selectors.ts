import { createSelector } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import { every, toPairs, flow, pickBy, map, fromPairs, keys } from 'lodash/fp';
import { propertyTypes } from 'types/property-type.type';
import { GameState } from 'types/game-state.type';
import { Property } from 'types/property.type';

export const selectGameState = (state: AppState) => state.gameState;
export const selectProperties = (state: GameState) => state.properties;
export const selectPowerups = (state: GameState) => state.powerups;

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

  static readonly upgradeConditions = createSelector(
    Selectors.level,
    (level, { property }) =>
      propertyTypes[property].upgradeConditionsFromLevel(level)
  );

  static readonly powerup = createSelector(
    selectPowerups,
    (powerups, { powerup }) => powerups?.[powerup] || 0
  );

  static readonly workDuration = createSelector(
    selectGameState,
    (state: GameState) => {
      const workEfficiency = Selectors.value(state, {
        property: 'workEfficiency',
      });
      const coffeeCount = Selectors.powerup(state, { powerup: 'coffee' });
      return workEfficiency / Math.pow(2, coffeeCount);
    }
  );

  static readonly upgradesPossible = createSelector(
    selectGameState,
    (state: GameState) =>
      flow([
        keys,
        map((property) => [
          property,
          state.funds >= Selectors.upgradeCost(state, { property }) &&
            flow([
              toPairs,
              every(
                ([conditionProperty, threshold]) =>
                  Selectors.value(state, { property: conditionProperty }) >=
                  threshold
              ),
            ])(Selectors.upgradeConditions(state, { property })),
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
        keys,
        map((property) => [
          property,
          pickBy(
            (threshold: number, conditionProperty: Property) =>
              Selectors.value(state, { property: conditionProperty }) <
              threshold
          )(Selectors.upgradeConditions(state, { property })),
        ]),
        fromPairs,
      ])(state.properties)
  );
}
