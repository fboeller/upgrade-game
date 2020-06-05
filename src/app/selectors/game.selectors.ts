import { createSelector } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import {
  every,
  toPairs,
  flow,
  pickBy,
  map,
  fromPairs,
  keys,
  intersection,
  some,
  filter,
} from 'lodash/fp';
import { propertyTypes } from 'types/property-type.type';
import { GameState } from 'types/game-state.type';
import {
  Property,
  personalProperties,
  businessProperties,
} from 'types/property.type';
import { Upgrade } from 'types/upgrade.type';

export const selectGameState = (state: AppState) => state.gameState;
export const selectProperties = (state: GameState) => state.properties;
export const selectPowerups = (state: GameState) => state.powerups;
export const selectFunds = (state: GameState) => state.funds;

export const selectUpgradeConditions = (
  state: GameState
): { [property: string]: { [property: string]: number } } =>
  flow([
    keys,
    map((property: Property) => [
      property,
      Selectors.upgradeConditions(state, { property }),
    ]),
    fromPairs,
  ])(state.properties);

export class Selectors {
  static readonly level = createSelector(
    selectProperties,
    (properties, { property }) => properties?.[property] || 0
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

  static readonly availablePersonalProperties = createSelector(
    selectProperties,
    (properties) =>
      intersection(keys(properties), personalProperties) as Property[]
  );

  static readonly availableBusinessProperties = createSelector(
    selectProperties,
    (properties) =>
      intersection(keys(properties), businessProperties) as Property[]
  );

  static readonly powerup = createSelector(
    selectPowerups,
    (powerups, { powerup }) => powerups?.[powerup] || 0
  );

  static readonly sufficientFunds = createSelector(
    selectFunds,
    Selectors.upgradeCost,
    (funds: number, upgradeCost: number) => funds >= upgradeCost
  );

  static readonly isUpgradeCondition = createSelector(
    selectProperties,
    Selectors.level,
    selectUpgradeConditions,
    (properties, level, upgradeConditions, { property }) =>
      flow([
        keys,
        map(
          (dependentProperty: Property) =>
            upgradeConditions[dependentProperty][property]
        ),
        some((requiredLevel) => !!requiredLevel && requiredLevel > level),
      ])(properties)
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

  static readonly possibleUpgrades = createSelector(
    selectGameState,
    (state: GameState): Upgrade[] =>
      flow([
        keys,
        filter(
          (property) =>
            state.funds >= Selectors.upgradeCost(state, { property })
        ),
        filter((property) =>
          flow([
            toPairs,
            every(
              ([conditionProperty, threshold]) =>
                Selectors.value(state, { property: conditionProperty }) >=
                threshold
            ),
          ])(Selectors.upgradeConditions(state, { property }))
        ),
        map((property: string) => ({
          property,
          level: state.properties[property],
        })),
      ])(state.properties)
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
