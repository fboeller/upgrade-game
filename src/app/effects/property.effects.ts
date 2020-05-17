import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, propertyRevealed } from 'actions/game.actions';
import { createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { flatMap, filter, first, map } from 'rxjs/operators';
import { properties, Property } from 'types/property.type';
import { upgradeCostOf, upgradeConditionsOf } from 'types/property-type.type';
import { some, flow, map as _map, toPairs } from 'lodash/fp';
import { GameState } from 'types/game-state.type';

@Injectable()
export class PropertyEffects {
  constructor(private store: Store<AppState>) {}

  sufficientFunds(state: GameState, property: Property): boolean {
    return (
      state.funds >=
      upgradeCostOf(property)(state.properties[property]?.level || 0)
    );
  }

  isUpgradeCondition(state: GameState, property: Property): boolean {
    return flow([
      toPairs,
      _map(
        ([dependentProperty, propertyState]) =>
          upgradeConditionsOf(dependentProperty)(propertyState.level)[property]
      ),
      some(
        (requiredLevel) =>
          !!requiredLevel &&
          requiredLevel > (state.properties[property]?.level || 0)
      ),
    ])(state.properties);
  }

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
}
