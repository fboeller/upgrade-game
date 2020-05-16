import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState, achievementUnlocked } from 'actions/game.actions';
import {
  map,
  flatMap,
  scan,
  filter,
  withLatestFrom,
} from 'rxjs/operators';
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

  newActionAchievements = (
    unlockedAchievements: Achievement[],
    actionCounts: ActionCounts
  ) =>
    _flow(
      _pullAll(unlockedAchievements),
      _filter((achievementName) =>
        achievementMap[achievementName].actionCondition(actionCounts)
      )
    )(achievements);

  actionAchievementUnlocking$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: Action) => action.type !== achievementUnlocked.type),
      scan(
        (actionCounts, action) => ({
          ...actionCounts,
          [action.type]: (actionCounts[action.type] || 0) + 1,
        }),
        {}
      ),
      withLatestFrom(
        this.store.pipe(select('gameState', 'achievements')),
        (actionCounts, unlockedAchievements) =>
          this.newActionAchievements(unlockedAchievements, actionCounts)
      ),
      flatMap((achievements) => from(achievements)),
      map((achievement) => achievementUnlocked({ achievement }))
    )
  );
}
