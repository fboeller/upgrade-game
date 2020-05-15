import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from '../../actions/game.actions';
import { upgradesPossible, unfulfiledUpgradeConditions } from '../../selectors/game.selectors';
import { PropertyState, Property, propertyTypes } from 'src/app/types/property.type';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.styl'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PropertyPanelComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input() title: string;
  @Input() properties: Property[] = [];
  @Output() visibleFundsEffect: EventEmitter<number> = new EventEmitter();

  propertyStates$: Observable<{ [property: string]: PropertyState }>;
  upgradesPossible$: Observable<{ [property: string]: boolean }>;
  unfulfiledUpgradeConditions$: Observable<{ [property: string]: { [property: string]: number } }>;

  propertyTypes = propertyTypes;

  ngOnInit() {
    this.propertyStates$ = this.store.pipe(select('gameState', 'properties'));
    this.upgradesPossible$ = this.store.pipe(select(upgradesPossible));
    this.unfulfiledUpgradeConditions$ = this.store.pipe(select(unfulfiledUpgradeConditions));
  }

  upgrade(property: Property) {
    this.store.dispatch(upgrade({ property }));
  }
}
