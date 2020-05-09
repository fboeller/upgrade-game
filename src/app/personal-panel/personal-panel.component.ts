import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, range, zip, generate } from 'rxjs';
import {
  scan,
  startWith,
  map,
  filter,
  first,
  withLatestFrom,
  skip,
  tap,
} from 'rxjs/operators';
import { Upgrade } from '../upgrade';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './personal-panel.component.html',
  styleUrls: ['./personal-panel.component.styl'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PersonalPanelComponent implements OnInit {
  constructor() {}

  @Input() funds$: Observable<number>;
  @Output('upgradePurchase') upgradePurchaseOut: EventEmitter<
    Upgrade
  > = new EventEmitter();

  increaseSalaryButtonClicked$: Subject<any> = new Subject();

  salary$: Observable<number>;
  upgradePurchase$: Observable<Upgrade>;
  nextPurchase$: Observable<Upgrade>;
  salaryUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;
  salaryUpgrade$: Observable<Upgrade>;

  ngOnInit(): void {
    this.salaryUpgrade$ = range(3, 1000).pipe(
      map((cost) => ({
        property: 'Salary',
        cost,
        update: (x: number) => x + 1,
      }))
    );
    this.upgradePurchase$ = zip(
      this.increaseSalaryButtonClicked$,
      this.salaryUpgrade$,
      (_, upgrade) => upgrade
    );
    this.nextPurchase$ = zip(
      this.increaseSalaryButtonClicked$,
      this.salaryUpgrade$.pipe(skip(1)),
      (_, nextUpgrade) => nextUpgrade
    ).pipe(
      startWith({
        property: 'Salary',
        cost: 3,
        update: (x: number) => x + 1,
      })
    );
    this.salary$ = this.upgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.update(salary), 1),
      startWith(1)
    );
    this.salaryUpgradePossible$ = this.funds$.pipe(
      withLatestFrom(
        this.nextPurchase$,
        (value, nextPurchase) => value >= nextPurchase.cost
      )
    );
    this.panelVisible$ = this.salaryUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );

    this.upgradePurchase$.subscribe((purchase) =>
      this.upgradePurchaseOut.emit(purchase)
    );
  }
}
