import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, propertyRevealed } from 'actions/game.actions';
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
          filter(
            (state) =>
              Selectors.sufficientFunds(state, { property }) ||
              Selectors.isUpgradeCondition(state, { property })
          ),
          first(),
          map(() => propertyRevealed({ property }))
        )
      )
    )
  );
}
