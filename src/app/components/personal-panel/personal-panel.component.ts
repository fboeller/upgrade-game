import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map, filter, first } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade, Property } from '../../actions/game.actions';
import { isUpgradePossible } from '../../selectors/game.selectors';
import { propertyTypes } from 'src/app/property.type';

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

  propertyTypes = propertyTypes;

  salaryProperty$: Observable<Property>;
  salaryUpgradePossible$: Observable<boolean>;
  workEfficiencyProperty$: Observable<Property>;
  workEfficiencyUpgradePossible$: Observable<boolean>;
  panelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.salaryProperty$ = this.store.pipe(
      select('gameState', 'properties', 'salary')
    );
    this.salaryUpgradePossible$ = this.store.pipe(
      select(isUpgradePossible, { property: 'salary' })
    );
    this.workEfficiencyProperty$ = this.store.pipe(
      select('gameState', 'properties', 'workEfficiency')
    );
    this.workEfficiencyUpgradePossible$ = this.store.pipe(
      select(isUpgradePossible, { property: 'workEfficiency' })
    );
    this.panelVisible$ = this.salaryUpgradePossible$.pipe(
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgrade(property: 'salary' | 'workEfficiency') {
    this.store.dispatch(upgrade({ property }));
  }
}
