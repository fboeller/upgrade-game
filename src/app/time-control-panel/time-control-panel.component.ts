import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { merge, Subject, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-time-control-panel',
  templateUrl: './time-control-panel.component.html',
  styleUrls: ['./time-control-panel.component.styl'],
})
export class TimeControlPanelComponent implements OnInit {
  @Output('timeActive') timeActiveOut: EventEmitter<boolean> = new EventEmitter();

  pauseButtonClicked$: Subject<any> = new Subject();
  resumeButtonClicked$: Subject<any> = new Subject();
  timeActive$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    const pauseRequest$ = this.pauseButtonClicked$.pipe(mapTo(false));
    const resumeRequest$ = this.resumeButtonClicked$.pipe(mapTo(true));
    this.timeActive$ = merge(pauseRequest$, resumeRequest$)
      .pipe(startWith(true));

    this.timeActive$.subscribe((timeActive) => this.timeActiveOut.emit(timeActive));
  }
}
