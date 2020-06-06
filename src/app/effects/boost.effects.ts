import { Injectable } from '@angular/core';
import { activateBoost, deactivateBoost } from 'src/app/game.actions';
import { map, delay, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { boostMap } from 'types/boost.type';

@Injectable()
export class BoostEffects {
  constructor(private actions$: Actions) {}

  deactivation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(activateBoost),
      map((action) => action.boost),
      flatMap((boost) => of(boost).pipe(delay(boostMap[boost].duration))),
      map((boost) => deactivateBoost({ boost }))
    )
  );
}
