import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, interval, fromEvent, combineLatest, merge } from 'rxjs';
import { mapTo, scan, withLatestFrom, startWith, map } from 'rxjs/operators';

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
  incrementUpgrade$: Observable<{ cost: number; f: (number) => number }>;

  ngAfterViewInit() {
    this.incrementUpgrade$ = fromEvent(this.button.nativeElement, 'click').pipe(
      mapTo({ cost: 10, f: (x: number) => x + 1 })
    );
    this.increment$ = this.incrementUpgrade$.pipe(
      scan((increment, upgrade) => upgrade.f(increment), 1),
      startWith(1)
    );
    const tick$ = interval(1000);
    this.value$ = merge(
      tick$.pipe(
        withLatestFrom(this.increment$, (_, increment) => (value) =>
          value + increment
        )
      ),
      this.incrementUpgrade$.pipe(
        map((incrementUpgrade) => (value) => value - incrementUpgrade.cost)
      )
    ).pipe(
      scan((acc, f) => f(acc), 0),
      startWith(0)
    );
  }
}
