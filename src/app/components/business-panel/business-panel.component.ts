import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade, resume } from '../../actions/game.actions';
import { upgradesPossible, filterBecameAffordable } from '../../selectors/game.selectors';
import { PropertyState, Property } from 'src/app/property.type';

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

  properties: Property[] = ['businessIncome'];
  propertyStates$: Observable<{ [property: string]: PropertyState }>;
  upgradesPossible$: Observable<{ [property: string]: boolean }>;
  panelVisible$: Observable<boolean>;
  becameAffordableProperties$: Observable<Property[]>;

  ngOnInit() {
    this.propertyStates$ = this.store.pipe(select('gameState', 'properties'));
    this.upgradesPossible$ = this.store.pipe(select(upgradesPossible));
    this.becameAffordableProperties$ = this.store.pipe(select(filterBecameAffordable, { properties: this.properties }));
  }

  upgrade(property: Property) {
    this.store.dispatch(upgrade({ property }));
    this.store.dispatch(resume());
  }
}
