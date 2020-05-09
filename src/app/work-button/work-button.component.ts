import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { withLatestFrom, delay, mapTo, startWith } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-work-button',
  templateUrl: './work-button.component.html',
  styleUrls: ['./work-button.component.styl'],
  animations: [
    trigger('startWork', [
      state('workInProgress', style({
        width: '100%'
      })),
      state('noWorkInProgress', style({
        width: '0%'
      })),
      transition('noWorkInProgress => workInProgress', [
        animate('1s')
      ])
    ])
  ]
})
export class WorkButtonComponent implements AfterViewInit {

  @Input() salary$: Observable<number>;
  @Output() earnedSalary: EventEmitter<number> = new EventEmitter();

  @ViewChild('workButton') workButton: ElementRef;

  workButtonPressable$: Observable<boolean>;

  constructor() { }

  ngAfterViewInit() {
    const workStarted$ = fromEvent(this.workButton.nativeElement, 'click').pipe(
      withLatestFrom(this.salary$, (_, salary) => salary)
    );
    const workEnded$ = workStarted$.pipe(delay(1000));
    this.workButtonPressable$ = merge(
      workStarted$.pipe(mapTo(false)),
      workEnded$.pipe(mapTo(true))
    ).pipe(startWith(true));
    workEnded$.subscribe(earnedSalary => this.earnedSalary.emit(earnedSalary));
  }

}
