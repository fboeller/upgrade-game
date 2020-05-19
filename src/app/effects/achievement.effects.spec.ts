import { AchievementEffects } from './achievement.effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { achievementUnlocked, work } from 'actions/game.actions';
import { initialState } from 'types/game-state.type';
import { Actions } from '@ngrx/effects';

describe('AchievementEffects', () => {
  let effects: AchievementEffects;
  let mockStore: MockStore;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AchievementEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  }));

  beforeEach(() => {
    effects = TestBed.inject(AchievementEffects);
    mockStore = TestBed.inject(MockStore);
  });

  it(
    'should not unlock anything in the initial state',
    marbles((m) => {
      mockStore.setState({ gameState: initialState });
      m.expect(effects.stateAchievementUnlocking$).toBeObservable('');
    })
  );

  it(
    'should unlock an achievement if the condition is met',
    marbles((m) => {
      mockStore.setState({ gameState: { funds: 1 } });
      m.expect(effects.stateAchievementUnlocking$).toBeObservable('a', {
        a: achievementUnlocked({ achievement: 'firstIncome' }),
      });
    })
  );

  it(
    'should unlock multiple achievements if conditions are met at the same time',
    marbles((m) => {
      mockStore.setState({
        gameState: { funds: 1, properties: { education: 1 } },
      });
      m.expect(effects.stateAchievementUnlocking$).toBeObservable('(ab)', {
        a: achievementUnlocked({ achievement: 'firstIncome' }),
        b: achievementUnlocked({ achievement: 'educated' }),
      });
    })
  );

  it(
    'should unlock an action achievement once the condition is met',
    marbles((m) => {
      mockStore.setState({
        gameState: { achievements: [] },
      });
      actions$ = m.cold('wwwww', { w: work });
      m.expect(effects.actionAchievementUnlocking$).toBeObservable('----a', {
        a: achievementUnlocked({ achievement: 'workHorse' }),
      });
    })
  );
});
