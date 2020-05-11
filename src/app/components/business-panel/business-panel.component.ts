import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, filter, first, map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade, resume } from '../../actions/game.actions';
import { isUpgradePossible } from '../../selectors/game.selectors';
import { propertyTypes } from 'src/app/property.type';

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

  propertyTypes = propertyTypes;

  businessIncome$: Observable<number>;
  businessIncomeUpgradePossible$: Observable<boolean>;
  factoryPanelVisible$: Observable<boolean>;

  ngOnInit() {
    this.businessIncome$ = this.store.pipe(
      select('gameState', 'properties', 'businessIncome', 'value')
    );
    this.businessIncomeUpgradePossible$ = this.store.pipe(
      select(isUpgradePossible, { property: 'businessIncome' })
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
