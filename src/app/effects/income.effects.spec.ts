import { TestBed, async } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { initialState } from 'types/game-state.type';
import { Actions } from '@ngrx/effects';
import { IncomeEffects } from './income.effects';
import { work, income } from 'actions/game.actions';

describe('IncomeEffects', () => {
  let effects: IncomeEffects;
  let mockStore: MockStore;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        IncomeEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  }));

  beforeEach(() => {
    effects = TestBed.inject(IncomeEffects);
    mockStore = TestBed.inject(MockStore);
  });

  it(
    'should produce income after 1s in the initial state',
    marbles((m) => {
      actions$ = m.hot('a', { a: work() });
      mockStore.setState({
        gameState: { properties: { workEfficiency: 0 } },
      });
      m.expect(effects.workIncome$).toBeObservable('1s b', {
        b: income({ property: 'salary' }),
      });
    })
  );

  it(
    'should produce income after 800ms after the first work efficiency upgrade',
    marbles((m) => {
      actions$ = m.hot('a', { a: work() });
      mockStore.setState({
        gameState: { properties: { workEfficiency: 1 } },
      });
      m.expect(effects.workIncome$).toBeObservable('800ms b', {
        b: income({ property: 'salary' }),
      });
    })
  );

  it(
    'should produce income 500ms if the coffee powerup is active',
    marbles((m) => {
      actions$ = m.hot('a', { a: work() });
      mockStore.setState({
        gameState: {
          properties: { workEfficiency: 0 },
          powerups: { coffee: 1 },
        },
      });
      m.expect(effects.workIncome$).toBeObservable('500ms b', {
        b: income({ property: 'salary' }),
      });
    })
  );

  it(
    'should produce income in 400ms if the coffee powerup is active and the work efficiency is at level 1',
    marbles((m) => {
      actions$ = m.hot('a', { a: work() });
      mockStore.setState({
        gameState: {
          properties: { workEfficiency: 1 },
          powerups: { coffee: 1 },
        },
      });
      m.expect(effects.workIncome$).toBeObservable('400ms b', {
        b: income({ property: 'salary' }),
      });
    })
  );
});
