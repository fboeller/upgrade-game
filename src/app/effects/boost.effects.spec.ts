import { TestBed, async } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { activateBoost, deactivateBoost } from 'src/app/game.actions';
import { Actions } from '@ngrx/effects';
import { BoostEffects } from './boost.effects';

describe('BoostEffects', () => {
  let effects: BoostEffects;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BoostEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  }));

  it(
    'should deactivate the boost again after the duration',
    marbles((m) => {
      actions$ = m.hot('a 2000ms a', {
        a: activateBoost({ boost: 'coffee' }),
      });
      effects = TestBed.inject(BoostEffects);
      m.expect(effects.deactivation$).toBeObservable('5000ms b 2000ms b', {
        b: deactivateBoost({ boost: 'coffee' }),
      });
    })
  );
});
