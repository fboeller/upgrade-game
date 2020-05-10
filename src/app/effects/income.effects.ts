import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, income } from '../actions';
import { switchMap, map, delay } from 'rxjs/operators';
import { interval, NEVER } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';

@Injectable()
export class IncomeEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  workIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Button] Work'),
      delay(1000),
      map((_) => income({ property: 'salary' }))
    )
  );

  regularIncome$ = createEffect(() =>
    this.store.pipe(
      select('gameState', 'timeActive'),
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER)),
      map((_) => income({ property: 'businessIncome' }))
    )
  );
}
