import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, income } from 'actions/game.actions';
import { switchMap, map, delay, flatMap, withLatestFrom } from 'rxjs/operators';
import { interval, NEVER, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { propertyTypes, valueOf } from 'types/property-type.type';

@Injectable()
export class IncomeEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  workIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Button] Work'),
      withLatestFrom(
        this.store.pipe(
          select('gameState', 'properties', 'workEfficiency', 'level')
        ),
        (_, level) => valueOf('workEfficiency')(level)
      ),
      flatMap((workEfficiency) => of({}).pipe(delay(workEfficiency))),
      map(() => income({ property: 'salary' }))
    )
  );

  regularIncome$ = createEffect(() =>
    this.store.pipe(
      select('gameState', 'timeActive'),
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER)),
      map(() => income({ property: 'businessIncome' }))
    )
  );
}
