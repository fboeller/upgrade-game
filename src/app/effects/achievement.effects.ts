import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState, achievementUnlocked, work } from 'actions/game.actions';
import { map, flatMap, scan, skipWhile, first, filter } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { achievementMap, achievements } from 'types/achievement.type';
import {
  flow as _flow,
  pullAll as _pullAll,
  filter as _filter,
} from 'lodash/fp';
import { from } from 'rxjs';
import { GameState } from 'types/game-state.type';

@Injectable()
export class AchievementEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  newAchievements = (gameState: GameState) =>
    _flow(
      _pullAll(gameState.achievements),
      _filter((achievementName) =>
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
      filter((action: Action) => action.type !== achievementUnlocked.type),
      scan(
        (acc, action) => ({
          ...acc,
          [action.type]: (acc[action.type] || 0) + 1,
        }),
        {}
      ),
      skipWhile((actionCounts) => (actionCounts[work.type] || 0) < 5),
      first(),
      map(() => achievementUnlocked({ achievement: 'workHorse' }))
    )
  );
}
