import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, propertyRevealed } from 'actions/game.actions';
import { createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { flatMap, filter, first, map } from 'rxjs/operators';
import { properties, Property } from 'types/property.type';
import { some, flow, map as _map, keys } from 'lodash/fp';
import { GameState } from 'types/game-state.type';
import { Selectors } from 'selectors/game.selectors';

@Injectable()
export class PropertyEffects {
  constructor(private store: Store<AppState>) {}

  propertyRevealing$ = createEffect(() =>
    from(properties).pipe(
      flatMap((property) =>
        this.store.pipe(
          select('gameState'),
          filter(
            (state) =>
              this.sufficientFunds(state, property) ||
              this.isUpgradeCondition(state, property)
          ),
          first(),
          map(() => propertyRevealed({ property }))
        )
      )
    )
  );

  sufficientFunds(state: GameState, property: Property): boolean {
    return state.funds >= Selectors.upgradeCost(state, { property });
  }

  isUpgradeCondition(state: GameState, property: Property): boolean {
    return flow([
      keys,
      _map(
        (dependentProperty) =>
          Selectors.upgradeConditions(state, { property: dependentProperty })[
            property
          ]
      ),
      some(
        (requiredLevel) =>
          !!requiredLevel &&
          requiredLevel > Selectors.level(state, { property })
      ),
    ])(state.properties);
  }
}
