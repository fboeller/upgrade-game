import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, interval, NEVER, Subscription } from 'rxjs';
import { Upgrade } from '../upgrade';
import {
  mapTo,
  scan,
  startWith,
  switchMap,
  filter,
  first,
  withLatestFrom,
  map,
} from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import {
  GameState,
  AppState,
  businessIncome,
  businessIncomeUpgrade,
} from '../actions';

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
  subscription: Subscription;

  ngOnInit() {
    this.businessIncome$ = this.store.pipe(
      select('gameState'),
      select('businessIncome')
    );
    this.subscription = this.store
      .pipe(
        select('gameState'),
        select('timeActive'),
        switchMap((timeActive) => (timeActive ? interval(1000) : NEVER))
      )
      .subscribe((_) => this.businessIncome());
    this.businessIncomeUpgradePossible$ = this.store.pipe(
      select('gameState'),
      map((state) => state.funds >= 10)
    );
    this.factoryPanelVisible$ = this.businessIncomeUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  businessIncome() {
    this.store.dispatch(businessIncome());
  }

  upgradeBusinessIncome() {
    this.store.dispatch(businessIncomeUpgrade());
  }
}
