import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, interval, NEVER } from 'rxjs';
import { Upgrade } from '../upgrade';
import { mapTo, scan, startWith, switchMap, filter, first, withLatestFrom, map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

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

  constructor() { }

  @Input() funds$: Observable<number>;
  @Input() timeActive$: Observable<boolean>;

  @Output('earning') earningOut: EventEmitter<number> = new EventEmitter();
  @Output('upgradePurchase') upgradePurchaseOut: EventEmitter<Upgrade> = new EventEmitter();

  incrementUpgradeButtonClicked$: Subject<any> = new Subject();

  increment$: Observable<number>;
  incrementUpgradePurchase$: Observable<Upgrade>;
  incrementUpgradePossible$: Observable<boolean>;
  factoryPanelVisible$: Observable<boolean>;
  earning$: Observable<number>;
  incrementUpgrade: Upgrade = { property: 'Factory', cost: 10, update: (x: number) => x + 1 };

  ngOnInit(): void {
    this.incrementUpgradePurchase$ = this.incrementUpgradeButtonClicked$.pipe(
      mapTo(this.incrementUpgrade)
    );
    this.increment$ = this.incrementUpgradePurchase$.pipe(
      scan((increment, upgrade) => upgrade.update(increment), 0),
      startWith(0)
    );
    this.earning$ = this.timeActive$.pipe(
      switchMap((timeActive) => (timeActive ? interval(1000) : NEVER)),
      withLatestFrom(this.increment$, (_, increment) => increment)
    );
    this.incrementUpgradePossible$ = this.funds$.pipe(
      map((value) => value >= this.incrementUpgrade.cost)
    );
    this.factoryPanelVisible$ = this.incrementUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );

    this.earning$.subscribe(value => this.earningOut.emit(value));
    this.incrementUpgradePurchase$.subscribe(purchase => this.upgradePurchaseOut.emit(purchase));
  }

}
