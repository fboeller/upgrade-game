import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, upgrade } from 'src/app/game.actions';
import { Selectors, selectGameState } from 'selectors/game.selectors';
import { Property } from 'types/property.type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
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
