import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, income } from '../actions';
import { switchMap, map } from 'rxjs/operators';
import { interval, NEVER } from 'rxjs';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class IncomeEffects {
  constructor(private store: Store<AppState>) {}

  regularIncome$ = createEffect(() =>
    this.store.pipe(
      select('gameState', 'timeActive'),
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER)),
      map((_) => income({ property: 'businessIncome' }))
    )
  );
}
