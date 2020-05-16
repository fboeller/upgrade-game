import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState, achievementUnlocked } from 'actions/game.actions';
import { map, flatMap, scan, filter, first } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import {
  achievementMap,
  achievements,
  ActionCounts,
  Achievement,
} from 'types/achievement.type';
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

  newStateAchievements = (gameState: GameState) =>
    _flow(
      _pullAll(gameState.achievements),
      _filter((achievementName) =>
        achievementMap[achievementName].stateCondition(gameState)
      )
    )(achievements);

  stateAchievementUnlocking$ = createEffect(() =>
    this.store.pipe(
      select('gameState'),
      flatMap((gameState) => from(this.newStateAchievements(gameState))),
      map((achievement) => achievementUnlocked({ achievement }))
    )
  );

  actionAchievementUnlocking$ = createEffect(() =>
    from(achievements).pipe(
      flatMap((achievement) =>
        this.actions$.pipe(
          filter((action: Action) => action.type !== achievementUnlocked.type),
          scan(
            (actionCounts, action) => ({
              ...actionCounts,
              [action.type]: (actionCounts[action.type] || 0) + 1,
            }),
            {}
          ),
          filter((actionCounts) =>
            achievementMap[achievement].actionCondition(actionCounts)
          ),
          first(),
          map(() => achievementUnlocked({ achievement }))
        )
      )
    )
  );
}
