import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Observable, fromEvent, merge, Subject } from 'rxjs';
import { withLatestFrom, delay, mapTo, startWith } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
  @Input() salary$: Observable<number>;
  @Output() earnedSalary: EventEmitter<number> = new EventEmitter();

  workButtonClicked$: Subject<any> = new Subject();

  workButtonPressable$: Observable<boolean>;

  constructor() {}

  ngOnInit() {
    const workStarted$ = this.workButtonClicked$.pipe(
      withLatestFrom(this.salary$, (_, salary) => salary)
    );
    const workEnded$ = workStarted$.pipe(delay(1000));
    this.workButtonPressable$ = merge(
      workStarted$.pipe(mapTo(false)),
      workEnded$.pipe(mapTo(true))
    ).pipe(startWith(true));
    workEnded$.subscribe((earnedSalary) =>
      this.earnedSalary.emit(earnedSalary)
    );
  }
}
