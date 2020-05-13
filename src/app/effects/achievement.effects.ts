import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, achievementUnlocked } from '../actions/game.actions';
import { map, flatMap, filter } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';
import { achievements$, Achievement } from '../types/achievement.type';
import { every } from 'lodash/fp';

@Injectable()
export class AchievementEffects {
  constructor(private store: Store<AppState>) {}

  achievementUnlocking$ = createEffect(() =>
    this.store.pipe(
      select('gameState'),
      flatMap((gameState) =>
        achievements$.pipe(
          filter((achievement) => every((a: Achievement) => a.name != achievement.name)(gameState.achievements)),
          filter((achievement) => achievement.condition(gameState))
        )
      ),
      map((achievement) => achievementUnlocked({ achievement }))
    )
  );
}
