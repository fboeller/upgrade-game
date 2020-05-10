import { Component, OnInit } from '@angular/core';
import { Observable, merge, BehaviorSubject, Subject } from 'rxjs';
import {
  mapTo,
  scan,
  startWith,
  map,
  filter,
  first,
  shareReplay,
} from 'rxjs/operators';
import { Upgrade } from './upgrade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [],
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  earning$: Subject<number> = new Subject();
  upgradePurchase$: Subject<Upgrade> = new Subject();

  funds$: Observable<number>;
  salary$: Observable<number>;

  timeControlPanelVisible$: Observable<boolean>;

  ngOnInit() {
    this.salary$ = this.upgradePurchase$.pipe(
      filter((upgrade) => upgrade.property == 'Salary'),
      scan((salary, upgrade) => upgrade.update(salary), 1),
      startWith(1),
      shareReplay(1)
    );
    this.funds$ = merge(
      this.earning$.pipe(map((salary) => (value) => value + salary)),
      this.upgradePurchase$.pipe(
        map((purchase) => (value) => value - purchase.cost)
      )
    ).pipe(
      scan((acc, f) => f(acc), 0),
      startWith(100),
      shareReplay(1)
    );
    this.timeControlPanelVisible$ = this.upgradePurchase$.pipe(
      filter((upgrade) => upgrade.property == 'Factory'),
      mapTo(true),
      first(),
      startWith(false)
    );
  }
}
