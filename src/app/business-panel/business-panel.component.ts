import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, filter, first, map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade, resume } from '../actions';

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
      select('gameState', 'properties', 'businessIncome', 'value')
    );
    this.businessIncomeUpgradePossible$ = this.store.pipe(
      select('gameState'),
      map((state) => state.funds >= state.properties.businessIncome.upgradeCost)
    );
    this.factoryPanelVisible$ = this.businessIncomeUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgradeBusinessIncome() {
    this.store.dispatch(upgrade({ property: 'businessIncome' }));
    this.store.dispatch(resume());
  }
}
