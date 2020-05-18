import { createSelector } from '@ngrx/store';
import { AppState } from 'actions/game.actions';
import { every, toPairs, flow, pickBy, map, fromPairs } from 'lodash/fp';
import {
  valueOf,
  upgradeCostOf,
  upgradeConditionsOf,
} from 'types/property-type.type';
import { GameState } from 'types/game-state.type';
import { Property } from 'types/property.type';

export const selectGameState = (state: AppState) => state.gameState;

export class Selectors {
  static readonly value = createSelector(
    selectGameState,
    (state: GameState, { property }) =>
      valueOf(property)(state.properties?.[property]?.level)
  );

  static readonly powerup = createSelector(
    selectGameState,
    (state: GameState, { powerup }) => state.powerups?.[powerup] || 0
  );

  static readonly workDuration = createSelector(
    selectGameState,
    (state: GameState) => {
      const workEfficiency = valueOf('workEfficiency')(
        state.properties?.workEfficiency?.level || 0
      );
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
                  valueOf(conditionProperty)(
                    state.properties?.[conditionProperty]?.level
                  ) >= threshold
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
              valueOf(conditionProperty)(
                state.properties?.[conditionProperty]?.level
              ) < threshold
          )(upgradeConditionsOf(property)(propertyState.level)),
        ]),
        fromPairs,
      ])(state.properties)
  );
}
