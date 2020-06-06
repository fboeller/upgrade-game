import { Injectable } from '@angular/core';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState, propertyRevealed } from 'src/app/game.actions';
import { createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { flatMap, filter, first, map } from 'rxjs/operators';
import { properties } from 'types/property.type';
import { Selectors, selectGameState } from 'selectors/game.selectors';

@Injectable()
export class PropertyEffects {
  constructor(private store: Store<AppState>) {}

  propertyRevealing$ = createEffect(() =>
    from(properties).pipe(
      flatMap((property) =>
        this.store.pipe(
          select(selectGameState),
          filter((state) => this.isRevealable(state, { property })),
          first(),
          map(() => propertyRevealed({ property }))
        )
      )
    )
  );

  isRevealable = createSelector(
    Selectors.sufficientFunds,
    Selectors.isUpgradeCondition,
    (sufficientFunds, isUpgradeCondition) =>
      sufficientFunds || isUpgradeCondition
  );
}
