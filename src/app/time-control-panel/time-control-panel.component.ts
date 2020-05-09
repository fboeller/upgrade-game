import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-time-control-panel',
  templateUrl: './time-control-panel.component.html',
  styleUrls: ['./time-control-panel.component.styl']
})
export class TimeControlPanelComponent implements AfterViewInit {

  @Output('timeActive') timeActive$: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('pauseButton') pauseButton: ElementRef;
  @ViewChild('resumeButton') resumeButton: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const pauseRequest$ = fromEvent(
      this.pauseButton.nativeElement,
      'click'
    ).pipe(mapTo(false));
    const resumeRequest$ = fromEvent(
      this.resumeButton.nativeElement,
      'click'
    ).pipe(mapTo(true));
    merge(pauseRequest$, resumeRequest$).pipe(
      startWith(true)
    ).subscribe(timeActive => this.timeActive$.emit(timeActive));
  }

}
