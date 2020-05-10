import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, range, zip } from 'rxjs';
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
import { Store, select } from '@ngrx/store';
import { AppState, salaryUpgrade } from '../actions';

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
  constructor(private store: Store<AppState>) {}

  @Input() funds$: Observable<number>;
  @Output('upgradePurchase') upgradePurchaseOut: EventEmitter<
    Upgrade
  > = new EventEmitter();

  salary$: Observable<number>;
  salaryUpgradeCost$: Observable<number>;
  salaryUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.salaryUpgradeCost$ = this.store.pipe(
      select('gameState'),
      select('salaryUpgradeCost')
    );
    this.salary$ = this.store.pipe(
      select('gameState'),
      select('salary')
    );

    this.salaryUpgradePossible$ = this.funds$.pipe(
      withLatestFrom(this.salaryUpgradeCost$, (value, cost) => value >= cost)
    );
    this.panelVisible$ = this.salaryUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgradeSalary() {
    this.store.dispatch(salaryUpgrade());
    this.upgradePurchaseOut.emit({
      property: 'Salary',
      cost: 3, // TODO: Actual cost
      update: (x: number) => x + 1,
    });
  }
}
