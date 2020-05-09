import { Component, OnInit } from '@angular/core';
import {
  Observable,
  interval,
  merge,
  NEVER,
  BehaviorSubject,
  Subject,
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
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  incrementUpgradeButtonClicked$: Subject<any> = new Subject();

  timeActive$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  earnedSalary$: Subject<number> = new Subject();

  funds$: Observable<number>;

  salaryUpgradePurchase$: Subject<{
    cost: number;
    f: (number) => number;
  }> = new Subject();
  salary$: Observable<number>;

  increment$: Observable<number>;
  incrementUpgradePurchase$: Observable<{
    cost: number;
    f: (number) => number;
  }>;
  incrementUpgradePossible$: Observable<boolean>;
  factoryPanelVisible$: Observable<boolean>;
  incrementUpgrade = { cost: 3, f: (x: number) => x + 1 };

  ngOnInit() {
    this.incrementUpgradePurchase$ = this.incrementUpgradeButtonClicked$.pipe(
      mapTo(this.incrementUpgrade)
    );
    this.increment$ = this.incrementUpgradePurchase$.pipe(
      scan((increment, upgrade) => upgrade.f(increment), 0),
      startWith(0)
    );
    this.salary$ = this.salaryUpgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.f(salary), 1),
      startWith(1)
    );
    const tick$ = this.timeActive$.pipe(
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER))
    );
    this.funds$ = merge(
      tick$.pipe(
        withLatestFrom(this.increment$, (_, increment) => (value) =>
          value + increment
        )
      ),
      this.earnedSalary$.pipe(map((salary) => (value) => value + salary)),
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

    this.incrementUpgradePossible$ = this.funds$.pipe(
      map((value) => value >= this.incrementUpgrade.cost)
    );
    this.factoryPanelVisible$ = this.incrementUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }
}
