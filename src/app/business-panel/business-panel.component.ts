import { Component, OnInit } from '@angular/core';
import { Observable, interval, NEVER, Subscription } from 'rxjs';
import { startWith, switchMap, filter, first, map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, businessIncome, businessIncomeUpgrade } from '../actions';

@Component({
  selector: 'app-business-panel',
  templateUrl: './business-panel.component.html',
  styleUrls: ['./business-panel.component.styl'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BusinessPanelComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  businessIncome$: Observable<number>;
  businessIncomeUpgradePossible$: Observable<boolean>;
  factoryPanelVisible$: Observable<boolean>;

  ngOnInit() {
    this.businessIncome$ = this.store.pipe(
      select('gameState'),
      select('properties'),
      select('businessIncome')
    );
    this.businessIncomeUpgradePossible$ = this.store.pipe(
      select('gameState'),
      map((state) => state.funds >= state.properties.businessIncomeUpgradeCost)
    );
    this.factoryPanelVisible$ = this.businessIncomeUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgradeBusinessIncome() {
    this.store.dispatch(businessIncomeUpgrade());
  }
}
