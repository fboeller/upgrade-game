import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from 'actions/game.actions';
import {
  Selectors,
  selectProperties,
  selectGameState,
} from 'selectors/game.selectors';
import { Property } from 'types/property.type';
import { propertyTypes } from 'types/property-type.type';
import { map } from 'rxjs/operators';

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

  upgradesPossible$: Observable<{ [property: string]: boolean }>;
  unfulfiledUpgradeConditions$: Observable<{
    [property: string]: { [property: string]: number };
  }>;

  ngOnInit() {
    this.upgradesPossible$ = this.store.pipe(
      select(Selectors.upgradesPossible)
    );
    this.unfulfiledUpgradeConditions$ = this.store.pipe(
      select(Selectors.unfulfiledUpgradeConditions)
    );
  }

  upgradePossible(property: Property) {
    return this.upgradesPossible$.pipe(
      map((upgradesPossible) => upgradesPossible?.[property] || false)
    );
  }

  level(property: Property) {
    return this.store.pipe(
      select(selectGameState),
      map((state) => Selectors.level(state, { property }))
    );
  }

  unfulfiledUpgradeCondition(property: Property) {
    return this.unfulfiledUpgradeConditions$.pipe(
      map(
        (unfulfiledUpgradeConditions) =>
          unfulfiledUpgradeConditions?.[property] || false
      )
    );
  }

  upgrade(property: Property) {
    this.store.dispatch(upgrade({ property }));
  }
}
