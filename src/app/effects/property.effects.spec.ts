import { PropertyEffects } from './property.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed, async } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { initialState } from 'types/game-state.type';
import { propertyRevealed } from 'src/app/game.actions';

describe('PropertyEffects', () => {
  let effects: PropertyEffects;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [PropertyEffects, provideMockStore()],
    });
  }));

  beforeEach(() => {
    effects = TestBed.inject(PropertyEffects);
    mockStore = TestBed.inject(MockStore);
  });

  it(
    'should not reveal anything in the initial state',
    marbles((m) => {
      mockStore.setState({ gameState: initialState });
      m.expect(effects.propertyRevealing$).toBeObservable('');
    })
  );

  it(
    'should reveal salary on first funds',
    marbles((m) => {
      mockStore.setState({
        gameState: { funds: 1, properties: { salary: 0 } },
      });
      m.expect(effects.propertyRevealing$).toBeObservable('a', {
        a: propertyRevealed({ property: 'salary' }),
      });
    })
  );

  it(
    'should reveal property if other property depends on it',
    marbles((m) => {
      mockStore.setState({
        gameState: {
          funds: 1,
          properties: { salary: 5 },
        },
      });
      m.expect(effects.propertyRevealing$).toBeObservable('a', {
        a: propertyRevealed({ property: 'education' }),
      });
    })
  );
});
