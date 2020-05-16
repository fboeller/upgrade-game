import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, achievementUnlocked, work } from 'actions/game.actions';
import { map, flatMap, scan, skipWhile, first } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { achievementMap, achievements } from 'types/achievement.type';
import { pullAll, flow, filter } from 'lodash/fp';
import { from } from 'rxjs';
import { GameState } from 'types/game-state.type';

@Injectable()
export class AchievementEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  newAchievements = (gameState: GameState) =>
    flow(
      pullAll(gameState.achievements),
      filter((achievementName) =>
        achievementMap[achievementName].condition(gameState)
      )
    )(achievements);

  stateAchievementUnlocking$ = createEffect(() =>
    this.store.pipe(
      select('gameState'),
      flatMap((gameState) => from(this.newAchievements(gameState))),
      map((achievement) => achievementUnlocked({ achievement }))
    )
  );

  actionAchievementUnlocking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(work),
      scan((acc, action) => acc + 1, 0),
      skipWhile((n) => n < 5),
      first(),
      map(() => achievementUnlocked({ achievement: 'workHorse' }))
    )
  );
}
