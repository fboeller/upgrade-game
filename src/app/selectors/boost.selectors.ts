import { GameState } from 'types/game-state.type';
import { boostMap } from 'types/boost.type';
import { flow, keys, map, reduce } from 'lodash/fp';
import { createSelector } from '@ngrx/store';

export const selectBoosts = (state: GameState) => state.boosts;

export class BoostSelectors {
  static readonly count = createSelector(
    selectBoosts,
    (boosts, { boost }) => boosts?.[boost] || 0
  );

  static readonly boost = (state: GameState, { boost, property }) => {
    const count = BoostSelectors.count(state, { boost });
    return boostMap[boost].effect[property](count) || ((value) => value);
  };

  static readonly boosts = (state: GameState, { property }) => {
    return flow([
      selectBoosts,
      keys,
      map((boost) => BoostSelectors.boost(state, { boost, property })),
      reduce(
        (acc, f: (value: number) => number) => (value) => f(acc(value)),
        (value: number) => value
      ),
    ])(state);
  };
}
