import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, merge, Subject } from 'rxjs';
import { delay, mapTo, startWith, withLatestFrom } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, work } from '../../actions/game.actions';

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
    this.animationDuration$ = this.store.pipe(
      select('gameState', 'properties', 'workEfficiency', 'value')
    );
    this.workActive$ = this.store.pipe(select('gameState', 'workActive'));
    const workEffect$ = this.store.pipe(
      select('gameState', 'properties', 'salary', 'value')
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
