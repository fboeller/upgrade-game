import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Observable, interval, of, fromEvent } from 'rxjs';
import { mapTo, scan, withLatestFrom, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements AfterViewInit {
  title = 'upgrade-game';

  @ViewChild('incrementUpgradeButton') button: ElementRef;

  value$: Observable<number>;
  increment$: Observable<number>;
  incrementUpgrade$: Observable<(number) => number>;

  ngAfterViewInit() {
    this.incrementUpgrade$ = fromEvent(this.button.nativeElement, 'click').pipe(
      mapTo((x: number) => x * 2)
    );
    this.increment$ = this.incrementUpgrade$.pipe(
      scan((increment, f) => f(increment), 1),
      startWith(1)
    );
    this.value$ = interval(1000).pipe(
      withLatestFrom(this.increment$, (_, inc) => inc),
      scan((acc, inc) => acc + inc)
    );
  }
}
