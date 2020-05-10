import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Observable, merge, Subject } from 'rxjs';
import { withLatestFrom, delay, mapTo, startWith } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState, work } from '../actions';

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
      transition('noWorkInProgress => workInProgress', [animate('1s')]),
      transition('workInProgress => noWorkInProgress', [animate('0s')]),
    ]),
  ],
})
export class WorkButtonComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  workButtonClicked$: Subject<any> = new Subject();
  workButtonPressable$: Observable<boolean>;

  ngOnInit() {
    const workEnded$ = this.workButtonClicked$.pipe(delay(1000));
    this.workButtonPressable$ = merge(
      this.workButtonClicked$.pipe(mapTo(false)),
      workEnded$.pipe(mapTo(true))
    ).pipe(startWith(true));
  }

  work() {
    this.workButtonClicked$.next();
    this.store.dispatch(work());
  }
}
