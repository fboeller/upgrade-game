import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map, filter, first } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade, Property } from '../../actions/game.actions';
import { isUpgradePossible } from '../../selectors/game.selectors';

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

  salaryProperty$: Observable<Property>;
  salaryUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.salaryProperty$ = this.store.pipe(
      select('gameState', 'properties', 'salary')
    );
    this.salaryUpgradePossible$ = this.store.pipe(
      select(isUpgradePossible, { property: 'salary' })
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
