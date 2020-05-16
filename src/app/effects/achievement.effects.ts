import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, achievementUnlocked } from 'actions/game.actions';
import { map, flatMap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';
import { achievementMap, achievements } from 'types/achievement.type';
import { pullAll, flow, filter } from 'lodash/fp';
import { from } from 'rxjs';
import { GameState } from 'types/game-state.type';

@Injectable()
export class AchievementEffects {
  constructor(private store: Store<AppState>) {}

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
}
