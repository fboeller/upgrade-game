import { Injectable } from '@angular/core';
import { activatePowerup, deactivatePowerup } from 'src/app/game.actions';
import { map, delay, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { powerupMap } from 'types/powerup.type';

@Injectable()
export class PowerupEffects {
  constructor(private actions$: Actions) {}

  deactivation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(activatePowerup),
      map((action) => action.powerup),
      flatMap((powerup) =>
        of(powerup).pipe(delay(powerupMap[powerup].duration))
      ),
      map((powerup) => deactivatePowerup({ powerup }))
    )
  );
}
