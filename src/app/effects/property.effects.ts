import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, propertyRevealed } from 'actions/game.actions';
import { createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { flatMap, filter, first, map } from 'rxjs/operators';
import { properties } from 'types/property.type';
import { upgradeCostOf } from 'types/property-type.type';

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
              state.funds >=
              upgradeCostOf(property)(state.properties[property]?.level || 0)
          ),
          first(),
          map(() => propertyRevealed({ property }))
        )
      )
    )
  );
}
