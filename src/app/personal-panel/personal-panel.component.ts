import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map, filter, first } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from '../actions';

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

  salary$: Observable<number>;
  salaryUpgradeCost$: Observable<number>;
  salaryUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.salaryUpgradeCost$ = this.store.pipe(
      select('gameState', 'properties', 'salary', 'upgradeCost')
    );
    this.salary$ = this.store.pipe(
      select('gameState', 'properties', 'salary', 'value')
    );
    this.salaryUpgradePossible$ = this.store.pipe(
      select('gameState'),
      map((state) => state.funds >= state.properties.salary.upgradeCost)
    );
    this.panelVisible$ = this.salaryUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgradeSalary() {
    this.store.dispatch(upgrade({ property: 'salary' }));
  }
}
