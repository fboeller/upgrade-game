import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState, achievementUnlocked } from 'actions/game.actions';
import { map, flatMap, scan, filter, first } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { achievementMap, achievements } from 'types/achievement.type';
import { from } from 'rxjs';
import { selectGameState } from 'selectors/game.selectors';

@Injectable()
export class AchievementEffects {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  stateAchievementUnlocking$ = createEffect(() =>
    from(achievements).pipe(
      flatMap((achievement) =>
        this.store.pipe(
          select(selectGameState),
          filter((state) => achievementMap[achievement].stateCondition(state)),
          first(),
          map(() => achievementUnlocked({ achievement }))
        )
      )
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
