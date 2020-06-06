import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, income, work } from 'actions/game.actions';
import { switchMap, map, delay, flatMap, withLatestFrom } from 'rxjs/operators';
import { interval, NEVER, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Selectors } from 'selectors/game.selectors';

@Injectable()
export class IncomeEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  workIncome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(work),
      withLatestFrom(
        this.store.pipe(select(Selectors.boostedWorkEfficiency)),
        (_, workDuration) => workDuration
      ),
      flatMap((workDuration) => of({}).pipe(delay(workDuration))),
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
