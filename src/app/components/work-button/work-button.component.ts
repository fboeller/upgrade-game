import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, work } from 'actions/game.actions';
import { Selectors, selectGameState } from 'selectors/game.selectors';

@Component({
  selector: 'app-work-button',
  templateUrl: './work-button.component.html',
  styleUrls: ['./work-button.component.styl'],
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
      // transition('workInProgress => noWorkInProgress', [animate('0s')]),
    ]),
  ],
})
export class WorkButtonComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Output() visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  workActive$: Observable<boolean>;
  animationDuration$: Observable<number>;

  hoverActive$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.animationDuration$ = this.store.pipe(select(Selectors.workDuration));
    this.workActive$ = this.store.pipe(select('gameState', 'workActive'));
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
