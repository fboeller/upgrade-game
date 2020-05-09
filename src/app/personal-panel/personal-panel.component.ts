import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mapTo, scan, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './personal-panel.component.html',
  styleUrls: ['./personal-panel.component.styl']
})
export class PersonalPanelComponent implements OnInit {

  constructor() { }

  @Input() funds$: Observable<number>;
  @Output('salaryUpgradePurchase') salaryUpgradePurchaseOut: EventEmitter<{
    cost: number;
    f: (number) => number;
  }> = new EventEmitter();

  increaseSalaryButtonClicked$: Subject<any> = new Subject();

  salary$: Observable<number>;
  salaryUpgradePurchase$: Observable<{
    cost: number;
    f: (number) => number;
  }>;
  salaryUpgradePossible$: Observable<boolean>;
  salaryUpgrade = { cost: 3, f: (x: number) => x + 1 };

  ngOnInit(): void {
    this.salaryUpgradePurchase$ = this.increaseSalaryButtonClicked$.pipe(
      mapTo(this.salaryUpgrade)
    );
    this.salary$ = this.salaryUpgradePurchase$.pipe(
      scan((salary, upgrade) => upgrade.f(salary), 1),
      startWith(1)
    );
    this.salaryUpgradePossible$ = this.funds$.pipe(
      map((value) => value >= this.salaryUpgrade.cost)
    );

    this.salaryUpgradePurchase$.subscribe(purchase => this.salaryUpgradePurchaseOut.emit(purchase));
  }

}
