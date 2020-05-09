import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mapTo, scan, startWith, map } from 'rxjs/operators';
import { SalaryUpgrade } from '../salary-upgrade';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './personal-panel.component.html',
  styleUrls: ['./personal-panel.component.styl']
})
export class PersonalPanelComponent implements OnInit {

  constructor() { }

  @Input() funds$: Observable<number>;
  @Output('salaryUpgradePurchase') salaryUpgradePurchaseOut: EventEmitter<SalaryUpgrade> = new EventEmitter();

  increaseSalaryButtonClicked$: Subject<any> = new Subject();

  salary$: Observable<number>;
  salaryUpgradePurchase$: Observable<SalaryUpgrade>;
  salaryUpgradePossible$: Observable<boolean>;
  salaryUpgrade: SalaryUpgrade = { cost: 3, f: (x: number) => x + 1 };

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
