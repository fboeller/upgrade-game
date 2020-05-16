import { AchievementEffects } from './achievement.effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { achievementUnlocked } from 'actions/game.actions';
import { initialState } from 'types/game-state.type';

describe('AchievementEffects', () => {
  let effects: AchievementEffects;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AchievementEffects, provideMockStore()],
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
        gameState: { funds: 1, properties: { education: { value: 1 } } },
      });
      m.expect(effects.stateAchievementUnlocking$).toBeObservable('(ab)', {
        a: achievementUnlocked({ achievement: 'firstIncome' }),
        b: achievementUnlocked({ achievement: 'educated' }),
      });
    })
  );
});
