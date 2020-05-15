import { AchievementEffects } from './achievement.effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { initialState } from 'types/game-state.type';
import { Actions } from '@ngrx/effects';

describe('AchievementEffects', () => {
  let effects: AchievementEffects;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AchievementEffects,
        provideMockStore({ initialState: { gameState: initialState } }),
        provideMockActions(() => actions$),
      ],
    });
  }));

  beforeEach(() => {
    effects = TestBed.inject(AchievementEffects);
  });
});
