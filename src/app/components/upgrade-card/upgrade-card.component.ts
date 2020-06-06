import { Component, Input } from '@angular/core';
import { propertyTypes } from 'types/property-type.type';
import { Upgrade } from 'types/upgrade.type';
import { Store } from '@ngrx/store';
import { AppState, upgrade } from 'src/app/game.actions';

@Component({
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
})
export class UpgradeCardComponent {
  @Input() upgrade: Upgrade;

  propertyTypes = propertyTypes;

  constructor(private store: Store<AppState>) {}

  get propertyType() {
    return this.propertyTypes[this.upgrade.property];
  }

  doUpgrade() {
    this.store.dispatch(upgrade({ property: this.upgrade.property }));
  }
}
