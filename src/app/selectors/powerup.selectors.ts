import { GameState } from 'types/game-state.type';
import { powerupMap } from 'types/powerup.type';
import { flow, keys, map, reduce } from 'lodash/fp';
import { createSelector } from '@ngrx/store';

export const selectPowerups = (state: GameState) => state.powerups;

export class PowerupSelectors {
  static readonly powerup = createSelector(
    selectPowerups,
    (powerups, { powerup }) => powerups?.[powerup] || 0
  );

  static readonly boost = (state: GameState, { powerup, property }) => {
    const count = PowerupSelectors.powerup(state, { powerup });
    return powerupMap[powerup].effect[property](count) || ((value) => value);
  };

  static readonly boosts = (state: GameState, { property }) => {
    return flow([
      selectPowerups,
      keys,
      map((powerup) => PowerupSelectors.boost(state, { powerup, property })),
      reduce(
        (acc, f: (value: number) => number) => (value) => f(acc(value)),
        (value: number) => value
      ),
    ])(state);
  };
}
