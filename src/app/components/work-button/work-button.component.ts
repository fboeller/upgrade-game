import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, interval, from } from 'rxjs';
import {
  withLatestFrom,
  filter,
  distinctUntilChanged,
  flatMap,
  take,
  tap,
  endWith,
  map,
  share,
} from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store, select, Action } from '@ngrx/store';
import { AppState, work } from 'actions/game.actions';
import { Selectors, selectGameState } from 'selectors/game.selectors';
import { ofType, Actions } from '@ngrx/effects';

@Component({
  selector: 'app-work-button',
  templateUrl: './work-button.component.html',
  animations: [
    trigger('startWork', [
      state(
        'workInProgress',
        style({
          width: '100%',
        })
      ),
      state(
        'noWorkInProgress',
        style({
          width: '0%',
        })
      ),
      transition('noWorkInProgress => workInProgress', [
        animate('{{ duration }}ms'),
      ]),
    ]),
  ],
})
export class WorkButtonComponent implements OnInit {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  @Output() visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  workActive$: Observable<boolean>;
  animationDuration$: Observable<number>;
  progress$: Observable<number>;

  hoverActive$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.animationDuration$ = this.store.pipe(select(Selectors.workDuration));
    this.workActive$ = this.store.pipe(select('gameState', 'workActive'));
    this.progress$ = this.actions$.pipe(
      ofType(work),
      withLatestFrom(this.animationDuration$, (_, duration) => duration),
      flatMap((duration) =>
        interval(duration / 20).pipe(
          take(20),
          map((value) => value * 5),
          endWith(100)
        )
      ),
      share()
    );
    const workEffect$ = this.store.pipe(
      select(selectGameState),
      select(Selectors.value, { property: 'salary' })
    );
    this.hoverActive$
      .pipe(
        withLatestFrom(workEffect$, (hoverActive, workEffect) =>
          hoverActive ? workEffect : null
        )
      )
      .subscribe((fundsEffect) => this.visibleFundsEffect.emit(fundsEffect));
  }

  work() {
    this.store.dispatch(work());
  }
}
