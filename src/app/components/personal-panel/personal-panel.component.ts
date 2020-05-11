import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map, filter, first } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from '../../actions/game.actions';
import {
  isUpgradePossible,
  upgradesPossible,
} from '../../selectors/game.selectors';
import { propertyTypes, PropertyState } from 'src/app/property.type';

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
  propertyStates$: Observable<{ [property: string]: PropertyState }>;
  upgradesPossible$: Observable<{ [property: string]: boolean }>;

  panelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.propertyStates$ = this.store.pipe(select('gameState', 'properties'));
    this.upgradesPossible$ = this.store.pipe(select(upgradesPossible));
    this.panelVisible$ = this.upgradesPossible$.pipe(
      map((upgradesPossible) => upgradesPossible.salary),
      filter((possible) => possible),
      first(),
      startWith(false)
    );
  }

  upgrade(property: 'salary' | 'workEfficiency') {
    this.store.dispatch(upgrade({ property }));
  }
}
