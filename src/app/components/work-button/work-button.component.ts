import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState, work } from 'actions/game.actions';
import { Selectors, selectGameState } from 'selectors/game.selectors';

@Component({
  selector: 'app-work-button',
  templateUrl: './work-button.component.html',
})
export class WorkButtonComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Output() visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  workActive$: Observable<boolean>;
  animationDuration$: Observable<number>;
  progress$: Observable<number>;

  hoverActive$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.animationDuration$ = this.store.pipe(
      select(Selectors.boostedWorkEfficiency)
    );
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
