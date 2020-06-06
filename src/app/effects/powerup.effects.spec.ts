import { TestBed, async } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { activatePowerup, deactivatePowerup } from 'src/app/game.actions';
import { Actions } from '@ngrx/effects';
import { PowerupEffects } from './powerup.effects';

describe('PowerupEffects', () => {
  let effects: PowerupEffects;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PowerupEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  }));

  it(
    'should deactivate the powerup again after the duration',
    marbles((m) => {
      actions$ = m.hot('a 2000ms a', {
        a: activatePowerup({ powerup: 'coffee' }),
      });
      effects = TestBed.inject(PowerupEffects);
      m.expect(effects.deactivation$).toBeObservable('5000ms b 2000ms b', {
        b: deactivatePowerup({ powerup: 'coffee' }),
      });
    })
  );
});
