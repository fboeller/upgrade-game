import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  Observable,
  interval,
  fromEvent,
  merge,
  NEVER,
  BehaviorSubject,
  of,
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
  delay,
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
  increaseSalaryButtonClicked$: Subject<any> = new Subject();

  timeActive$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  earnedSalary$: Subject<number> = new Subject();

  value$: Observable<number>;

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

  ngOnInit() {
    this.salaryUpgradePurchase$ = this.increaseSalaryButtonClicked$.pipe(
      mapTo(this.salaryUpgrade)
    );
    this.salary$ = this.salaryUpgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.f(salary), 1),
      startWith(1)
    );

    this.incrementUpgradePurchase$ = this.incrementUpgradeButtonClicked$.pipe(
      mapTo(this.incrementUpgrade)
    );
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
