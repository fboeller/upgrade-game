import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  interval,
  fromEvent,
  merge,
  NEVER,
  BehaviorSubject,
  of,
} from 'rxjs';
import {
  mapTo,
  scan,
  withLatestFrom,
  startWith,
  map,
  switchMap,
  filter,
  first,
  delay,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements AfterViewInit {
  title = 'upgrade-game';

  @ViewChild('workButton') workButton: ElementRef;
  @ViewChild('incrementUpgradeButton') incrementUpgradeButton: ElementRef;
  @ViewChild('increaseSalaryButton') increaseSalaryButton: ElementRef;
  timeActive$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  value$: Observable<number>;

  workButtonPressable$: Observable<boolean>;

  increment$: Observable<number>;
  incrementUpgradePurchase$: Observable<{
    cost: number;
    f: (number) => number;
  }>;
  incrementUpgradePossible$: Observable<boolean>;
  factoryPanelVisible$: Observable<boolean>;
  incrementUpgrade = { cost: 10, f: (x: number) => x + 1 };

  salary$: Observable<number>;
  salaryUpgradePurchase$: Observable<{
    cost: number;
    f: (number) => number;
  }>;
  salaryUpgradePossible$: Observable<boolean>;
  salaryUpgrade = { cost: 10, f: (x: number) => x + 1 };

  ngAfterViewInit() {
    this.salaryUpgradePurchase$ = fromEvent(
      this.increaseSalaryButton.nativeElement,
      'click'
    ).pipe(mapTo(this.salaryUpgrade));
    this.salary$ = this.salaryUpgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.f(salary), 1),
      startWith(1)
    );
    const workStarted$ = fromEvent(this.workButton.nativeElement, 'click').pipe(
      withLatestFrom(this.salary$, (_, salary) => salary)
    );
    const workEnded$ = workStarted$.pipe(delay(1000));
    this.workButtonPressable$ = merge(
      workStarted$.pipe(mapTo(false)),
      workEnded$.pipe(mapTo(true))
    ).pipe(startWith(true));

    this.incrementUpgradePurchase$ = fromEvent(
      this.incrementUpgradeButton.nativeElement,
      'click'
    ).pipe(mapTo(this.incrementUpgrade));
    this.increment$ = this.incrementUpgradePurchase$.pipe(
      scan((increment, upgrade) => upgrade.f(increment), 0),
      startWith(0)
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
      workEnded$.pipe(map((salary) => (value) => value + salary)),
      this.incrementUpgradePurchase$.pipe(
        map((incrementUpgradePurchase) => (value) =>
          value - incrementUpgradePurchase.cost
        )
      ),
      this.salaryUpgradePurchase$.pipe(
        map((increaseSalaryPurchase) => (value) =>
          value - increaseSalaryPurchase.cost
        )
      )
    ).pipe(
      scan((acc, f) => f(acc), 0),
      startWith(0)
    );

    this.incrementUpgradePossible$ = this.value$.pipe(
      map((value) => value >= this.incrementUpgrade.cost)
    );
    this.salaryUpgradePossible$ = this.value$.pipe(
      map((value) => value >= this.salaryUpgrade.cost)
    );
    this.factoryPanelVisible$ = this.incrementUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }
}
