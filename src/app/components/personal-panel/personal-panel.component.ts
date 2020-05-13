import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from '../../actions/game.actions';
import { upgradesPossible, unfulfiledUpgradeConditions } from '../../selectors/game.selectors';
import { PropertyState, Property } from 'src/app/property.type';

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

  @Input() properties: Property[] = [];
  propertyStates$: Observable<{ [property: string]: PropertyState }>;
  upgradesPossible$: Observable<{ [property: string]: boolean }>;
  unfulfiledUpgradeConditions$: Observable<{ [property: string]: { [property: string]: number } }>;

  ngOnInit() {
    this.propertyStates$ = this.store.pipe(select('gameState', 'properties'));
    this.upgradesPossible$ = this.store.pipe(select(upgradesPossible));
    this.unfulfiledUpgradeConditions$ = this.store.pipe(select(unfulfiledUpgradeConditions));
  }

  upgrade(property: Property) {
    this.store.dispatch(upgrade({ property }));
  }
}
