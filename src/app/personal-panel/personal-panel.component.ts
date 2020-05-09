import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mapTo, scan, startWith, map, filter, first } from 'rxjs/operators';
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
  salaryUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;
  salaryUpgrade: Upgrade = {
    property: 'Salary',
    cost: 3,
    update: (x: number) => x + 1,
  };

  ngOnInit(): void {
    this.upgradePurchase$ = this.increaseSalaryButtonClicked$.pipe(
      mapTo(this.salaryUpgrade)
    );
    this.salary$ = this.upgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.update(salary), 1),
      startWith(1)
    );
    this.salaryUpgradePossible$ = this.funds$.pipe(
      map((value) => value >= this.salaryUpgrade.cost)
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
