import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, interval, fromEvent, merge, NEVER } from 'rxjs';
import {
  mapTo,
  scan,
  withLatestFrom,
  startWith,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements AfterViewInit {
  title = 'upgrade-game';

  @ViewChild('manualLaborButton') manualLaborButton: ElementRef;
  @ViewChild('incrementUpgradeButton') incrementUpgradeButton: ElementRef;
  @ViewChild('pauseButton') pauseButton: ElementRef;
  @ViewChild('resumeButton') resumeButton: ElementRef;

  value$: Observable<number>;
  increment$: Observable<number>;
  incrementUpgradePurchase$: Observable<{
    cost: number;
    f: (number) => number;
  }>;
  incrementUpgradePossible$: Observable<boolean>;
  timeActive$: Observable<boolean>;

  incrementUpgrade = { cost: 10, f: (x: number) => x + 1 };

  ngAfterViewInit() {
    const pauseRequest$ = fromEvent(
      this.pauseButton.nativeElement,
      'click'
    ).pipe(mapTo(false));
    const resumeRequest$ = fromEvent(
      this.resumeButton.nativeElement,
      'click'
    ).pipe(mapTo(true));
    this.timeActive$ = merge(pauseRequest$, resumeRequest$).pipe(
      startWith(true)
    );

    const manualLabor$ = fromEvent(
      this.manualLaborButton.nativeElement,
      'click'
    ).pipe(mapTo(1));

    this.incrementUpgradePurchase$ = fromEvent(
      this.incrementUpgradeButton.nativeElement,
      'click'
    ).pipe(mapTo(this.incrementUpgrade));
    this.increment$ = this.incrementUpgradePurchase$.pipe(
      scan((increment, upgrade) => upgrade.f(increment), 1),
      startWith(1)
    );
    const tick$ = this.timeActive$.pipe(
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER))
    );
    this.value$ = merge(
      tick$.pipe(
        withLatestFrom(this.increment$, (_, increment) => (value) =>
          value + increment
        )
      ),
      manualLabor$.pipe(map(increment => value => increment + value)),
      this.incrementUpgradePurchase$.pipe(
        map((incrementUpgradePurchase) => (value) =>
          value - incrementUpgradePurchase.cost
        )
      )
    ).pipe(
      scan((acc, f) => f(acc), 0),
      startWith(0)
    );
    this.incrementUpgradePossible$ = this.value$.pipe(
      map((value) => value < this.incrementUpgrade.cost)
    );
  }
}
